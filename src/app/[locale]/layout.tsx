import { getSession } from '@/utils/get-session';
import { getMessages } from 'next-intl/server';
import { cookies } from 'next/headers';
import NextTopLoader from 'nextjs-toploader';
import 'nprogress/nprogress.css';
import Providers from '../providers';
import './global.css';

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
  }>
) {
  const params = await props.params;

  const {
    children
  } = props;

  const session = await getSession();
  const cookieStore = await cookies();
  const currency = cookieStore.get('currency')?.value;
  const messages = await getMessages();

  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
    >
      <body>
        <NextTopLoader showSpinner={false} />
        <Providers
          user={session}
          currency={currency}
          messages={messages}
          locale={params.locale}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
