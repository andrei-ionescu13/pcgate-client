'use client';

import { usePageLoading } from '@/store/page-loading';
import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

export interface DataOverlayProps {
  children: ReactNode;
}

export const DataOverlay = ({ children }: DataOverlayProps) => {
  const { isPageLoading } = usePageLoading();

  return (
    <div className={cn(isPageLoading ? 'blur-xs saturate-100' : '')}>
      {isPageLoading && <div className="absolute inset-0 z-50" />}
      {children}
    </div>
  );
};
