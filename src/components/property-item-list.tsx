import type { FC } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface PropertyItemListProps {
  items: string[] | undefined;
}

export const PropertyItemList: FC<PropertyItemListProps> = (props) => {
  const { items } = props;

  return (
    <List
      disablePadding
      sx={{
        '& .MuiListItem-root:first-of-type .MuiListItemText-root': {
          mt: 0
        }
      }}
    >
      {items?.map((item) => (
        <ListItem
          disableGutters
          disablePadding
          key={item}
        >
          <ListItemText
            primary={item}
            primaryTypographyProps={{
              color: 'textPrimary',
              variant: 'body2'
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};
