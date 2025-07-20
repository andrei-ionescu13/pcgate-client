//todo cleanup/refactor
'use client';

import { InputBase } from '@/components/input-base';
import { ChevronRight } from '@/icons/chevron-right';
import type { CardProps } from '@mui/material';
import { Button, Card, CardContent, Slider, styled } from '@mui/material';
import Chip from '@mui/material/Chip';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { MouseEvent, useEffect, useState } from 'react';

interface FilterCardProps extends CardProps {
  title: string;
  field: string;
  minOption: number;
  maxOption: number;
}

const initializeRange = (
  minParam: string | null,
  maxParam: string | null,
  min: number,
  max: number
): [number, number] => {
  try {
    let rangeMin = minParam ? Number.parseFloat(minParam) : min;
    let rangeMax = maxParam ? Number.parseFloat(maxParam) : max;

    rangeMin = rangeMin <= max ? rangeMin : min;
    rangeMax = rangeMax >= min ? rangeMax : max;

    return [rangeMin, rangeMax];
  } catch (error) {
    return [min, max];
  }
};

const FilterCardRangeRoot = styled(Card)(({ theme }) => ({
  boxShadow: `0px 0px 0px 2px ${theme.palette.background.neutral}`,
}));

function valuetext(value: number) {
  return `${value}312`;
}

export const FilterCardRange: FC<FilterCardProps> = (props) => {
  const { title, field, minOption, maxOption, ...rest } = props;
  const fieldMin = `${field}_min`;
  const fieldMax = `${field}_max`;
  const searchParams = useSearchParams();
  const queryMin = searchParams.get(fieldMin);
  const queryMax = searchParams.get(fieldMax);

  const [range, setRange] = useState<number[]>(
    initializeRange(
      searchParams.get(fieldMin),
      searchParams.get(fieldMax),
      minOption,
      maxOption
    )
  );

  const [inputMin, setInputMin] = useState(range[0]);
  const [inputMax, setInputMax] = useState(range[1]);

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);

    if (typeof newValue !== 'number') {
      setInputMin(newValue[0]);
      setInputMax(newValue[1]);
    }
  };

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    try {
      const value = Number.parseFloat(event.target.value);
      setInputMin(value);

      if (value <= range[1]) {
        const temp = [...range];
        temp[0] = value;
        setRange(temp);
      }
    } catch (error) {}
  };

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    try {
      const value = Number.parseFloat(event.target.value);
      setInputMax(value);

      if (value >= range[0]) {
        const temp = [...range];
        temp[1] = value;
        setRange(temp);
      }
    } catch (error) {}
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const params = new URLSearchParams(searchParams);

    range[0] !== minOption
      ? params.set(fieldMin, range[0].toString())
      : params.delete(fieldMin);
    range[1] !== maxOption
      ? params.set(fieldMax, range[1].toString())
      : params.delete(fieldMax);

    window.history.pushState(null, '', '?' + params.toString());
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);

    params.delete(fieldMin);
    params.delete(fieldMax);

    window.history.pushState(null, '', '?' + params.toString());
  };

  useEffect(() => {
    setRange(
      initializeRange(
        searchParams.get(fieldMin),
        searchParams.get(fieldMax),
        minOption,
        maxOption
      )
    );
  }, [searchParams, field, minOption, maxOption]);

  useEffect(() => {
    setInputMin(range[0]);
    setInputMax(range[1]);
  }, [range]);

  return (
    <FilterCardRangeRoot
      elevation={0}
      {...rest}
    >
      <div className="bg-neutral flex items-center px-4 py-2">
        <p className="subtitle1">{title}</p>
        <div className="flex-1" />
        {(!!queryMin || !!queryMax) && (
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
        <div className="px-3 pt-8 pb-4">
          <Slider
            disableSwap
            color="secondary"
            value={range}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={minOption}
            max={maxOption}
          />
        </div>
        <div className="flex gap-1">
          <InputBase
            type="number"
            placeholder="Min"
            value={inputMin}
            onChange={handleMinChange}
            className="border-divider max-w-12 rounded-lg border py-0.5"
          />
          <p className="text-text-secondary align-middle">-</p>
          <InputBase
            type="number"
            placeholder="Max"
            value={inputMax}
            onChange={handleMaxChange}
            className="border-divider max-w-12 rounded-lg border py-0.5"
          />
          <Button
            sx={{ py: 0.5, px: 1, minWidth: 'fit-content' }}
            color="darkGrey"
            variant="contained"
            onClick={handleClick}
          >
            <ChevronRight fontSize="small" />
          </Button>
        </div>
      </CardContent>
    </FilterCardRangeRoot>
  );
};
