import { useRef } from 'react';
import type { FC } from 'react';
import { Box, Button, List, ListItemButton, Popover, Typography } from '@mui/material';
import type { SxProps } from '@mui/system';
import { ChevronDown as ChevronDownIcon } from '@/icons/chevron-down';
import { useOpen } from '@/hooks/use-open';

export interface SortByPopoverItem {
  value: string;
  label: string;
}

interface SortByPopoverProps {
  sx?: SxProps;
  items: SortByPopoverItem[]
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
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          color="textPrimary"
          variant="body2"
          sx={{
            mr: 2,
            whiteSpace: 'nowrap'
          }}
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
              onClick={() => { handleChange(item.value) }}
            >
              {item.label}
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
};
