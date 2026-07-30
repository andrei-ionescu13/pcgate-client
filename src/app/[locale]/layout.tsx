import { getSession } from '@/utils/get-session';
import { getMessages } from 'next-intl/server';
import { Roboto } from 'next/font/google';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import 'nprogress/nprogress.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Providers from '../providers';
import './global.css';

const roboto = Roboto({
  subsets: ['latin'],
});

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { user } = await getSession();
  const cookieStore = await cookies();
  const currency = cookieStore.get('currency')?.value;
  const messages = await getMessages();

  return (
    <html
      lang={'en'}
      suppressHydrationWarning
      className={roboto.className}
    >
      <body className="flex flex-col">
        <NextTopLoader showSpinner={false} />
        <Providers
          user={user}
          currency={currency}
          messages={messages}
          locale={locale}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
