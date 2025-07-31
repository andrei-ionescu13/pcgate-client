import { useOpen } from '@/hooks/use-open';
import { ChevronDown as ChevronDownIcon } from '@/icons/chevron-down';
import { cn } from '@/utils/cn';
import { Button, Popover } from '@mui/material';
import type { SxProps } from '@mui/system';
import type { FC } from 'react';
import { useRef } from 'react';
import { ListButton } from './dropdown-button';

export interface SortByPopoverItem {
  value: string;
  label: string;
}

interface SortByPopoverProps {
  sx?: SxProps;
  items: SortByPopoverItem[];
  value: string;
  onChange: (value: string) => void;
}

export const SortByPopover: FC<SortByPopoverProps> = (props) => {
  const { items, value, onChange } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, handleOpen, handleClose] = useOpen();
  const itemSelected = items.find((item) => item.value === value);

  const handleChange = (value: string): void => {
    onChange(value);
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
                  handleChange(item.value);
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
