import type { FC, ReactNode } from 'react';
import { Typography, ListItem } from '@mui/material';

interface PropertyItemProps {
  align?: 'horizontal' | 'vertical';
  content: string | ReactNode;
  label: string;
}

export const PropertyItem: FC<PropertyItemProps> = (props) => {
  const { label, content, align = 'horizontal' } = props;

  return (
    <ListItem
      disableGutters
      sx={{
        alignItems: align === 'horizontal' ? 'center' : 'flex-start',
        flexDirection: align === 'horizontal' ? 'row' : 'column',
      }}
    >
      <Typography
        color="textSecondary"
        sx={{ width: align === 'horizontal' ? 120 : 'auto' }}
        variant="body2"
      >
        {label}
      </Typography>
      {typeof content === 'string'
        ? (<Typography
          color="textPrimary"
          variant="body2"
        >
          {content}
        </Typography>)
        : content
      }
    </ListItem>
  );
};