import { AppImage } from '@/components/app-image';
import { Container } from '@/components/container';
import { cn } from '@/utils/cn';
import { getDeal, listDealProducts } from './api';
import { CollectionProducts } from './collection-products';
import { CollectionTimer } from './collection-timer';

const Deal = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const deal = await getDeal(slug);
  const initialProducts = await listDealProducts(slug, 0);

  return (
    <div className="relative min-h-screen overflow-hidden py-10">
      <div
        className={cn(
          'absolute inset-0 h-screen overflow-hidden',
          deal.hasExpired && 'grayscale-75'
        )}
      >
        <AppImage
          fill
          priority
          src={deal.cover.public_id}
          alt=""
          className="object-cover"
        />
        <div className="bg-deal absolute inset-0" />
      </div>
      <Container
        maxWidth="lg"
        className="relative z-10"
      >
        <div>
          <div className="grid place-items-center">
            <h1 className="text-primary">{deal.title}</h1>
            <h4>{deal.description}</h4>
            {!deal.hasExpired && <CollectionTimer deal={deal} />}
            {deal.hasExpired && (
              <p className="h5 mt-6">This offer has expired</p>
            )}
          </div>
          {!deal.hasExpired && (
            <CollectionProducts initialProducts={initialProducts} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Deal;
