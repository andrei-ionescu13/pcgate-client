'use client';

import type { CardProps } from '@mui/material';
import {
  ButtonBase,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  InputBase,
  styled,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';

interface FilterCardCheckboxProps extends CardProps {
  title: string;
  limit?: number;
  minItems?: number;
  field: string;
  items: Array<{ label: string; value: string }>;
}

interface FilterCheckboxProps {
  field: string;
  value: string;
  onClick: (value: string) => void;
}

const FilterCardCheckboxRoot = styled(Card)(({ theme }) => ({
  boxShadow: `0px 0px 0px 2px ${theme.palette.background.neutral}`,
}));

const FilterCheckbox: FC<FilterCheckboxProps> = (props) => {
  const { field, value, onClick } = props;
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(searchParams.has(field, value));

  useEffect(() => {
    setChecked(searchParams.has(field, value));
  }, [searchParams]);

  return (
    <Checkbox
      color="secondary"
      onChange={(event) => {
        setChecked(event.target.checked);
        onClick(value);
      }}
      checked={checked}
    />
  );
};
export const FilterCardCheckbox: FC<FilterCardCheckboxProps> = (props) => {
  const { title, limit = 12, field, items, minItems = 4, ...rest } = props;
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [showMore, setshowMore] = useState(false);
  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(keyword.toLowerCase())
  );
  const slicedItems = filteredItems.slice(0, showMore ? limit : minItems);

  const handleShowMoreChange = () => {
    setshowMore((prev) => !prev);
  };

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (params.has(field, value)) {
      params.delete(field, value);
    } else {
      params.append(field, value);
    }

    window.history.pushState(null, '', '?' + params.toString());
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(field);

    window.history.pushState(null, '', '?' + params.toString());
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  };

  return (
    <FilterCardCheckboxRoot
      elevation={0}
      {...rest}
    >
      <div className="bg-neutral flex items-center px-4 py-2">
        <p className="subtitle1">{title}</p>
        <div className="flex-1" />
        {searchParams.has(field) && (
          <Chip
            label="Clear"
            variant="outlined"
            size="small"
            onClick={handleClear}
          />
        )}
      </div>
      <CardContent
        sx={{
          py: 1,
          maxHeight: 360,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '3px',
            backgroundColor: 'background.neutral',
          },

          '&::-webkit-scrollbar-track': {
            borderRadius: '10px',
          },

          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.grey[500],
            borderRadius: '10px',
          },

          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgb(255, 251, 251)',
          },
        }}
      >
        {items.length > limit && (
          <div className="mb-2">
            <InputBase
              sx={{
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                px: 1.5,
                fontSize: 14,
                fontWeight: 'normal',
                '& input': {
                  color: (theme) => theme.palette.text.primary,
                  '&::placeholder': {
                    color: (theme) => theme.palette.text.disabled,
                  },
                },
              }}
              placeholder="Search..."
              value={keyword}
              onChange={handleKeywordChange}
            />
          </div>
        )}
        <FormGroup>
          {slicedItems.map((item) => (
            <FormControlLabel
              sx={{ userSelect: 'none' }}
              key={item.value}
              control={
                <FilterCheckbox
                  field={field}
                  value={item.value}
                  onClick={handleClick}
                />
              }
              label={item.label}
              componentsProps={{
                typography: { variant: 'body3' },
              }}
            />
          ))}

          {items.length > minItems && (
            <ButtonBase
              disableRipple
              onClick={handleShowMoreChange}
              sx={{
                mt: 1,
                color: 'primary.main',
                display: 'flex',
                justifyContent: 'flex-start',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <p className="subtitle2">{`Show ${showMore ? 'less' : 'more'}`}</p>
            </ButtonBase>
          )}
        </FormGroup>
      </CardContent>
    </FilterCardCheckboxRoot>
  );
};
