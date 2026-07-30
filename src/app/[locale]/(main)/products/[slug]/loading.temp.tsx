import { Skeleton } from '@/components/skeleton';
import { Container } from '@mui/material';

export default () => {
  return (
    <div className="min-h-screen py-10">
      <Container maxWidth="lg">
        <div className="grid grid-cols-12 gap-4 pb-10">
          <div className="col-span-8 hidden aspect-video md:block">
            <Skeleton />
          </div>
          <div className="col-span-12 aspect-video md:col-span-4">
            <Skeleton />
          </div>
        </div>
      </Container>
    </div>
  );
};
