import { cn } from '@/utils/cn';
import { Button, Popover } from '@mui/material';
import { ChevronDownIcon } from 'lucide-react';
import { useRef } from 'react';
import { ListButton } from './dropdown-button';

export interface SortByPopoverItem {
  value: string;
  label: string;
}

interface SortByPopoverProps {
  items: SortByPopoverItem[];
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SortByPopover = ({
  items,
  value,
  onChange,
  open,
  onOpen,
  onClose,
}: SortByPopoverProps) => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const itemSelected = items.find((item) => item.value === value);

  const handleChange = (value: string): void => {
    onChange(value);
    onClose();
  };

  return (
    <>
      <div className="flex items-center">
        <p className="body2 mr-4 text-nowrap">Sort by</p>
        <Button
          color="white"
          variant="outlined"
          ref={anchorRef}
          onClick={onOpen}
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
        onClose={onClose}
        open={open}
        slotProps={{
          paper: {
            sx: {
              maxWidth: 160,
              width: '100%',
            },
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
