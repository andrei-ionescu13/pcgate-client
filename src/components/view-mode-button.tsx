import type { FC, MouseEvent } from 'react';
import { Button } from '@mui/material';
import {
  GridView as GridViewIcon,
  ViewHeadline as ViewHeadlineIcon
} from '@mui/icons-material';

interface ViewModeButtonProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

export const ViewModeButton: FC<ViewModeButtonProps> = (props) => {
  const { viewMode, onViewModeChange } = props

  return (
    <Button
      color="white"
      variant="outlined"
      onClick={onViewModeChange}
      sx={{
        p: 0.75,
        minWidth: 'auto'
      }}
    >
      {viewMode === 'grid' ? <GridViewIcon /> : <ViewHeadlineIcon />}
    </Button>
  )
}