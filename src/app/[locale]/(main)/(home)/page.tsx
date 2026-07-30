import { Container } from '@/components/container';
import { ProductsSwiper } from '@/components/products-swiper';
import { Slideshow } from '@/components/slideshow';
import type { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

const listCollections = () =>
  appFetch<any>({
    url: '/deals',
  });

const listNewReleases = () =>
  appFetch<Product[]>({
    url: '/products/new-releases',
  });

export default async function Home() {
  const deals = await listCollections();
  const newReleases = await listNewReleases();

  return (
    <div className="pb-10 md:pt-10">
      <Container
        maxWidth="lg"
        className="p-0"
      >
        <div className="w-full overflow-hidden md:w-9/12 md:rounded-lg">
          <Slideshow items={deals} />
        </div>
      </Container>
      <Container maxWidth="lg">
        <div className="pt-16">
          <h4 className="mb-3">Top Sellers</h4>
          <ProductsSwiper products={newReleases} />
        </div>
      </Container>
    </div>
  );
}
