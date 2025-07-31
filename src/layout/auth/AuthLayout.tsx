import type { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  text?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = (props) => {
  const { children, text = '' } = props;

  return (
    <div className="grid min-h-screen grid-flow-col grid-cols-1 md:grid-cols-[480px_1fr]">
      <div>
        <div className="flex flex-col px-6 pt-16 md:px-20 lg:pt-10 xl:pt-36">
          {children}
        </div>
      </div>
      <div className="bg-auth-image relative hidden bg-cover bg-center md:flex">
        <div className="bg-auth-image-gradient absolute inset-0" />
        <div className="relative flex flex-1 items-end px-20 pb-40">
          <h2>{text}</h2>
        </div>
      </div>
    </div>
  );
};
