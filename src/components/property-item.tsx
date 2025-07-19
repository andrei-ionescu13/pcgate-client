import { cn } from '@/utils/cn';
import { Box, ListItem } from '@mui/material';
import type { FC, ReactNode } from 'react';

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
      <p
        className={cn(
          'text-text-secondary border-y',
          align === 'horizontal' ? 'min-w-[120px]' : 'min-w-auto'
        )}
      >
        {label}
      </p>
      <Box sx={{ typography: 'body1' }}>
        {typeof content === 'string' ? <p>{content}</p> : content}
      </Box>
    </ListItem>
  );
};
