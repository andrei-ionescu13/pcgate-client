import { AppImage } from '@/components/app-image';
import { Container } from '@/components/container';
import { Box } from '@mui/material';
import { getDeal, listDealProducts } from './api';
import { CollectionProducts } from './collection-products';
import { CollectionTimer } from './collection-timer';

const Deal = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const deal = await getDeal(slug);
  const initialProducts = await listDealProducts(slug, 0);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
        py: 5,
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zindex: 0,
          height: '100vh',
          filter: deal.hasExpired ? 'grayscale(80%)' : undefined,
        }}
      >
        <AppImage
          fill
          priority
          src={deal.cover.public_id}
          alt=""
          className="object-cover"
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
            linear-gradient(90deg, rgba(0, 0, 0, 0) 50%, #161C24 100%),
            linear-gradient(270deg, rgba(0, 0, 0, 0) 50%, #161C24 100%),
            linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #161C24 100%)
            `,
          }}
        />
      </Box>
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
    </Box>
  );
};

export default Deal;
