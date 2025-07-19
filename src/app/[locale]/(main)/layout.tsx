'use client';

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

  return (
    <div className="flex w-full">
      <Navbar onOpenSidebar={handleOpenSidebar} />
      <div className="flex h-full w-full flex-1 flex-col pt-14 sm:pt-28">
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </div>
      <MobileSidebar
        open={openSidebar}
        onClose={handleCloseSidebar}
      />
    </div>
  );
}
