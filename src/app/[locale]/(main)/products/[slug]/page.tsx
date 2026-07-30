import { Container } from '@/components/container';
import { Markdown } from '@/components/markdown';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { getProduct } from './api';
import { ProductDetails } from './product-details';
import {
  type ProductMediaSlide,
  type ProductMediaSlideImage,
  type ProductMediaSlideVideo,
  ProductMedia,
} from './product-media';
import { ProductPricing } from './product-pricing';
import { ProductRating } from './product-rating/product-rating';
import { ProductRequirements } from './product-requirements';

interface ProductProps {
  params: Promise<{ slug: string }>;
}

const Product = async ({ params }: ProductProps) => {
  const { slug } = await params;
  const product = await getProduct(slug);
  const content = await markdownToHtml(product.markdown);
  const minimumRequirements = await markdownToHtml(product.minimumRequirements);
  const recommendedRequirements = await markdownToHtml(
    product.recommendedRequirements
  );

  const imageSlides: ProductMediaSlideImage[] = product.images.map((image) => ({
    type: 'image',
    public_id: image.public_id,
  }));

  const videoSlides: ProductMediaSlideVideo[] = product.videos.map((video) => ({
    type: 'video',
    url: video,
  }));

  const slides: ProductMediaSlide[] = [...videoSlides, ...imageSlides];

  return (
    <div className="flex flex-1 flex-col">
      <div className="py-10">
        <Container maxWidth="lg">
          <div className="grid gap-4 pb-10 md:grid-cols-[8fr_4fr]">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="md:hidden">
                <ProductPricing product={product} />
              </div>
              <ProductMedia slides={slides} />
              <div className="text-text-primary my-6 [&>img]:max-w-full">
                <Markdown content={content} />
              </div>
              <ProductRequirements
                min={minimumRequirements}
                recommended={recommendedRequirements}
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="hidden md:block">
                <ProductPricing product={product} />
              </div>
              <ProductDetails product={product} />
            </div>
          </div>
          <ProductRating product={product} />
        </Container>
      </div>
    </div>
  );
};

export default Product;
