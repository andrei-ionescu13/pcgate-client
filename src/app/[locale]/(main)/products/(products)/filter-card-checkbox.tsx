'use client';

import { InputBase } from '@/components/input-base';
import type { CardProps } from '@mui/material';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import { FilterCard } from './filter-card';

interface FilterCardCheckboxProps extends CardProps {
  title: string;
  limit?: number;
  minItems?: number;
  field: string;
  items: Array<{ label: string; value: string; count: number }>;
}

interface FilterCheckboxProps {
  field: string;
  value: string;
  onClick: (value: string) => void;
}

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
  const { title, limit = 12, field, items, minItems = 8, ...rest } = props;
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState('');
  const [showMore, setshowMore] = useState(false);

  const activeItems = items.filter((item) =>
    searchParams.has(field, item.value)
  );
  const inactiveItems = items.filter(
    (item) => !searchParams.has(field, item.value)
  );

  const slicedItems = [...activeItems, ...inactiveItems].slice(
    0,
    showMore ? limit : minItems
  );

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
    <FilterCard
      title={title}
      field={field}
      onClear={searchParams.has(field) ? handleClear : undefined}
    >
      {items.length > limit && (
        <div className="mb-2">
          <InputBase
            className="border-divider rounded-lg border py-0.5"
            placeholder="Search..."
            value={keyword}
            onChange={handleKeywordChange}
          />
        </div>
      )}
      <FormGroup>
        {slicedItems.map((item) => (
          <div className="flex items-center justify-between">
            <FormControlLabel
              sx={{ userSelect: 'none' }}
              key={item.value}
              control={
                <Checkbox
                  color="secondary"
                  onChange={(event) => {
                    handleClick(item.value);
                  }}
                  checked={searchParams.has(field, item.value)}
                />
              }
              label={item.label}
              componentsProps={{
                typography: { variant: 'body3' },
              }}
            />
            <div className="caption bg-neutral inline-flex max-h-[24px] items-center rounded-lg p-1.5">
              {item.count}
            </div>
          </div>
        ))}

        {items.length > minItems && (
          <button
            onClick={handleShowMoreChange}
            className="text-primary subtitle2 mt-2 inline-flex hover:underline"
          >
            {`Show ${showMore ? 'less' : 'more'}`}
          </button>
        )}
      </FormGroup>
    </FilterCard>
  );
};
