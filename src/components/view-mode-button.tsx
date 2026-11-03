'use client';

import { Grid3X3Icon, Rows3Icon } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { Button } from './button';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

export const ViewModeButton = () => {
  const defaultViewMode = 'grid';
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState(
    searchParams.get('view_mode') || defaultViewMode
  );
  const router = useRouter();

  const handleClick = (): void => {
    const urlSearchParams = new URLSearchParams(searchParams);
    const nextViewMode = viewMode === 'grid' ? 'list' : 'grid';

    if (nextViewMode === defaultViewMode) {
      urlSearchParams.delete('view_mode');
    } else {
      urlSearchParams.set('view_mode', nextViewMode);
    }

    setViewMode(nextViewMode);
    router.push(`?${urlSearchParams}`);
  };

  return (
    <Button
      variant="outlined"
      className="min-w-auto p-1.5"
      onClick={handleClick}
    >
      {viewMode === 'grid' ? <Grid3X3Icon /> : <Rows3Icon />}
    </Button>
  );
};
