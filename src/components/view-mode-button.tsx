'use client';

import { Grid3X3Icon, Rows3Icon } from 'lucide-react';
import { useState, type MouseEvent } from 'react';
import { Button } from './button';

interface ViewModeButtonProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ViewModeButton = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const handleViewModeChange = () => {
    setViewMode((prev) => (prev === 'grid' ? 'list' : 'grid'));
  };
  return (
    <Button
      variant="outlined"
      className="min-w-auto p-1.5"
    >
      {viewMode === 'grid' ? <Grid3X3Icon /> : <Rows3Icon />}
    </Button>
  );
};
