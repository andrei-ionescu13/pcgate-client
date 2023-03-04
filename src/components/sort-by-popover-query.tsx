import { useRef } from 'react';
import type { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, List, ListItemButton, Popover, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';
import { ChevronDown as ChevronDownIcon } from '@/icons/chevron-down';
import { useOpen } from '@/hooks/use-open';

interface Item {
  value: string;
  label: string;
}

interface SortByPopoverQueryProps {
  sx?: SxProps;
  items: Item[]
}

export const SortByPopoverQuery: FC<SortByPopoverQueryProps> = (props) => {
  const { items } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { pathname, push, query } = useRouter();
  const [open, handleOpen, handleClose] = useOpen();
  const itemSelected = query.sortBy ? items.find((item) => item.value === query.sortBy) : items[0]

  const handleClick = (value: string): void => {
    const newQuery = {
      ...query,
      sortBy: value
    };

    push(
      {
        pathname,
        query: newQuery
      },
      undefined,
      { shallow: true }
    );
    handleClose()
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          color="textPrimary"
          variant="body2"
          sx={{ mr: 2 }}
        >
          Sort by
        </Typography>
        <Button
          color="white"
          variant="outlined"
          ref={anchorRef}
          onClick={handleOpen}
        >
          <Typography
            color="textPrimary"
            variant="body2"
            mr={1}
          >
            {itemSelected?.label}
          </Typography>
          <ChevronDownIcon
            sx={{
              transform: open ? 'rotate(180deg)' : undefined,
              transition: 'transform 200ms'
            }}
          />
        </Button>
      </Box>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            maxWidth: 160,
            width: '100%'
          }
        }}
      >
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.value}
              onClick={() => { handleClick(item.value) }}
            >
              {item.label}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};
