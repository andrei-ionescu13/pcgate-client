import { useState } from 'react';
import type { FC, ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Collapse,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { ChevronRightOutlined as ChevronRightIcon } from '../icons/chevron-right-outlined';

const FilterAccordionRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    borderLeft: `4px solid ${theme.palette.primary.main}`
  }));

interface FilterAccordionProps {
  items: Array<{ label: string; value: string }>
  field: {
    name: string;
    label: string;
  },
  sx?: SxProps;
}

export const FilterAccordion: FC<FilterAccordionProps> = (props) => {
  const { field, items } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const valuesSelected = searchParams.getAll(field.name);

  const handleOpenChange = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCheck = (event: ChangeEvent<HTMLInputElement>): void => {
    const valueSelected = event.target.value;
    searchParams.delete(field.name);

    if (valuesSelected.includes(valueSelected)) {
      valuesSelected.filter((value) => value !== valueSelected).forEach((value) => searchParams.append(field.name, value));
    } else {
      valuesSelected.forEach((value) => searchParams.append(field.name, value));
      searchParams.append(field.name, valueSelected);
    }

    searchParams.delete('page');
    navigate(location.pathname + '?' + searchParams.toString());
  };

  return (
    <FilterAccordionRoot {...props}>
      <Box
        onClick={handleOpenChange}
        sx={{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          p: 1.5
        }}
      >
        <Typography
          color="textPrimary"
          variant="subtitle2"
        >
          {field.label}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <ChevronRightIcon
          fontSize='small'
          sx={{
            color: 'text.secondary',
            transform: open ? 'rotate(90deg)' : 'none'
          }}
        />
      </Box>
      <Collapse in={open}>
        <FormGroup sx={{
          pb: 1.5,
          px: 1.5
        }}
        >
          {items.map((item) => (
            <FormControlLabel
              control={(
                <Checkbox
                  checked={valuesSelected.includes(item.value)}
                  color="primary"
                  onChange={handleCheck}
                />
              )}
              key={item.value}
              label={item.label}
              value={item.value}
              componentsProps={{
                typography: {
                  variant: 'body2'
                }
              }}
            />
          ))}
        </FormGroup>
      </Collapse>
    </FilterAccordionRoot>
  );
};
