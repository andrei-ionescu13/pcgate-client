'use client';

import { useOpen } from '@/hooks/use-open';
import { ChevronDown as ChevronDownIcon } from '@/icons/chevron-down';
import { cn } from '@/utils/cn';
import { Button, Popover } from '@mui/material';
import type { SxProps } from '@mui/system';
import { useSearchParams } from 'next/navigation';
import type { FC } from 'react';
import { useRef } from 'react';
import { ListButton } from './dropdown-button';

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
            className={cn('transition-all duration-200', open && 'rotate-180')}
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
        <ul>
          {items.map((item) => (
            <li key={item.value}>
              <ListButton
                onClick={() => {
                  handleClick(item.value);
                }}
              >
                {item.label}
              </ListButton>
            </li>
          ))}
        </ul>
      </Popover>
    </>
  );
};
