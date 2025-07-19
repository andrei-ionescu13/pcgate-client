'use client';

import { useOpen } from '@/hooks/use-open';
import { ChevronDown as ChevronDownIcon } from '@/icons/chevron-down';
import { Button, List, ListItemButton, Popover } from '@mui/material';
import type { SxProps } from '@mui/system';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { useRef } from 'react';

export interface SortByPopoverItem {
  value: string;
  label: string;
}

interface SortByPopoverProps {
  sx?: SxProps;
  items: SortByPopoverItem[];
}

export const SortByPopoverParam: FC<SortByPopoverProps> = (props) => {
  const { items } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, handleOpen, handleClose] = useOpen();
  const itemSelected = items.find(
    (item) => item.value === (searchParams.get('sortBy') || 'createdAt')
  );

  const handleChange = (value: string): void => {
    const params = new URLSearchParams(searchParams);

    if (value !== items[0].value) {
      params.set('sortBy', value);
    } else {
      params.delete('sortBy');
    }
    params.delete('page');

    replace(`${pathname}?${params.toString()}`);
    handleClose();
  };

  return (
    <>
      <div className="flex items-center">
        <p className="body2 mr-4 text-nowrap">Sort by</p>
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
                handleChange(item.value);
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
