import { CartDrawer } from '@/components/cart-drawer';
import { Footer } from '@/layout/footer';
import { MobileSidebar } from '@/layout/mobile-sidebar';
import { Navbar } from '@/layout/navbar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MobileSidebar />
      <CartDrawer />

      <div className="flex w-full flex-1">
        <Navbar />
        <div className="flex h-full w-full flex-1 flex-col pt-14 sm:pt-28">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
