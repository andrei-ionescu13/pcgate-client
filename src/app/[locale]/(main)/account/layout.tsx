import { Card } from '@/components/card';
import { Container } from '@/components/container';
import type { ReactNode } from 'react';
import { AccountMobileMenu } from './account-mobile-menu';
import { AccountSidebar } from './account-sidebar';

interface AccountLayoutProps {
  children: ReactNode;
}

const AccountLayout = ({ children }: AccountLayoutProps) => {
  return (
    <>
      <div className="min-h-full py-10">
        <Container
          maxWidth="lg"
          className="h-full"
        >
          <AccountMobileMenu />
          <Card className="relative grid h-full grid-cols-1 lg:grid-cols-[240px_1fr]">
            <div className="border-r-divider sticky top-0 hidden border-r lg:block">
              <AccountSidebar />
            </div>
            <div className="p-4 md:p-10">{children}</div>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default AccountLayout;
