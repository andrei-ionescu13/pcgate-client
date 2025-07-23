import {
  GridView as GridViewIcon,
  ViewHeadline as ViewHeadlineIcon,
} from '@mui/icons-material';
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
