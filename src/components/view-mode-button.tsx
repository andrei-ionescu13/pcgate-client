import { GridView as GridViewIcon } from '@/icons/grid-view';
import { ViewHeadline as ViewHeadlineIcon } from '@/icons/view-headline';
import type { FC, MouseEvent } from 'react';
import { Button } from './button';

interface ViewModeButtonProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ViewModeButton: FC<ViewModeButtonProps> = (props) => {
  const { viewMode, onViewModeChange } = props;

  return (
    <Button
      variant="outlined"
      onClick={onViewModeChange}
      className="min-w-auto p-1.5"
    >
      {viewMode === 'grid' ? <GridViewIcon /> : <ViewHeadlineIcon />}
    </Button>
  );
};
