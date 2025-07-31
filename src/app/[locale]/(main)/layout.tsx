'use client';

import { CartDrawer } from '@/components/cart-drawer';
import { useOpen } from '@/hooks/use-open';
import { Footer } from 'layout/footer';
import { MobileSidebar } from 'layout/mobile-sidebar';
import { Navbar } from 'layout/navbar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [openSidebar, handleOpenSidebar, handleCloseSidebar] = useOpen();
  const [openCartDrawer, handleOpenCartDrawer, handleCloseCartDrawer] =
    useOpen();

  return (
    <div className="flex w-full flex-1">
      <Navbar
        onOpenSidebar={handleOpenSidebar}
        onOpenCartDrawer={handleOpenCartDrawer}
      />
      <div className="flex h-full w-full flex-1 flex-col pt-14 sm:pt-28">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <MobileSidebar
        open={openSidebar}
        onClose={handleCloseSidebar}
      />
      <CartDrawer
        open={openCartDrawer}
        onClose={handleCloseCartDrawer}
      />
    </div>
  );
}
