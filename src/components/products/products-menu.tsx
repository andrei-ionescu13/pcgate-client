import { useState, useRef } from 'react';
import type { FC } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import type { OptionI } from 'pages/products';


interface ProductsMenuProps {
  onClick: (type: string, option: OptionI) => void;
  options: OptionI[];
  selectedOption: OptionI;
  type: 'sortBy' | 'show';
}

export const ProductsMenu: FC<ProductsMenuProps> = (props) => {
  const { options, selectedOption, type, onClick } = props;
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [show, setShow] = useState(false);

  const handleClick = (option: OptionI): void => {
    onClick(type, option);
    setShow(false);
  };

  return (
    <>
      <Button
        color="primary"
        onClick={() => { setShow(true); }}
        ref={buttonRef}
        variant="text"
      >
        {selectedOption.label}
      </Button>
      <Menu
        anchorEl={buttonRef.current}
        open={show}
        onClose={() => { setShow(false); }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            onClick={() => { handleClick(option); }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};