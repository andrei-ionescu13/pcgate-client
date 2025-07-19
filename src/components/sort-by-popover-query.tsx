'use client';

import { useOpen } from '@/hooks/use-open';
import { ChevronDown as ChevronDownIcon } from '@/icons/chevron-down';
import { Button, List, ListItemButton, Popover } from '@mui/material';
import type { SxProps } from '@mui/system';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { useRef } from 'react';

interface Item {
  value: string;
  label: string;
}

interface SortByPopoverQueryProps {
  sx?: SxProps;
  items: Item[];
  defaultValue: string;
}

export const SortByPopoverQuery: FC<SortByPopoverQueryProps> = (props) => {
  const { items, defaultValue } = props;
  const searchParams = useSearchParams();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, handleOpen, handleClose] = useOpen();
  const itemSelected = items.find(
    (item) => item.value === (searchParams.get('sortBy') || defaultValue)
  );

  const handleClick = (value: string): void => {
    const params = new URLSearchParams(searchParams);

    if (params.get('sortBy') === defaultValue) {
      params.delete('sortBy');
    } else {
      params.set('sortBy', value);
    }

    window.history.pushState(null, '', '?' + params.toString());
    handleClose();
  };

  return (
    <>
      <div className="flex items-center">
        <p className="body2 mr-4">Sort by</p>
        <Button
          color="white"
          variant="outlined"
          ref={anchorRef}
          onClick={handleOpen}
        >
          <p className="body2 mr-2">{itemSelected?.label}</p>
          <ChevronDownIcon
            sx={{
              transform: open ? 'rotate(180deg)' : undefined,
              transition: 'transform 200ms',
            }}
          />
        </Button>
      </div>
      <Popover
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={handleClose}
        open={open}
        PaperProps={{
          sx: {
            maxWidth: 160,
            width: '100%',
          },
        }}
      >
        <List>
          {items.map((item) => (
            <ListItemButton
              key={item.value}
              onClick={() => {
                handleClick(item.value);
              }}
            >
              {item.label}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};
