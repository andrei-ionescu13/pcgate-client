import { Container } from '@/components/container';
import { ProductsSwiper } from '@/components/products-swiper';
import { Slideshow } from '@/components/slideshow';
import type { Deal } from '@/types/deal';
import type { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';

const listDeals = () =>
  appFetch<Deal[]>({
    url: '/deals',
  });

const listNewReleases = () =>
  appFetch<Product[]>({
    url: '/products/new-releases',
  });

export default async function Home() {
  const deals = await listDeals();
  const newReleases = await listNewReleases();

  return (
    <div className="pb-10 md:pt-10">
      {deals.length && (
        <Container
          maxWidth="lg"
          className="p-0"
        >
          <div className="w-full overflow-hidden md:w-9/12 md:rounded-lg">
            <Slideshow items={deals} />
          </div>
        </Container>
      )}
      {newReleases.length && (
        <Container maxWidth="lg">
          <div className="pt-16">
            <h4 className="mb-3">Top Sellers</h4>
            <ProductsSwiper products={newReleases} />
          </div>
        </Container>
      )}
    </div>
  );
}
