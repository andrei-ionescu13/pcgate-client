import { Container } from '@/components/container';
import { ProductsSwiper } from '@/components/products-swiper';
import { Slideshow } from '@/components/slideshow';
import { Asset, Meta } from '@/types/common';
import { Product } from '@/types/product';
import { appFetch } from 'utils/app-fetch';

interface Collection {
  meta: Meta;
  _id: string;
  cover: Asset;
  title: string;
  description: string;
  slug: string;
  endDate: null | string;
  products: string[];
  isDeal: boolean;
}

const listCollections = () =>
  appFetch<any>({
    url: '/deals',
    withAuth: true,
  });

const listNewReleases = () =>
  appFetch<Product[]>({
    url: '/products/new-releases',
    withAuth: true,
  });

export default async function Home() {
  let deals;
  let newReleases;
  try {
    deals = await listCollections();
    newReleases = await listNewReleases();
  } catch (error) {
    console.log(error);
  }

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
        {/* <BrowseSection /> */}
      </Container>
    </div>
  );
}
