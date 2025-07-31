import { Button } from '@/components/button';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';

const NotFound = () => {
  return (
    <div className="relative h-dvh">
      <Image
        layout="fill"
        objectFit="cover"
        src="/images/404.gif"
        alt="Picture of the author"
      />
      <div className="absolute inset-0 grid content-center justify-items-center gap-2">
        <h1>404</h1>
        <p>It seems you have got lost</p>
        <Button asChild>
          <Link href="/">Take me home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
