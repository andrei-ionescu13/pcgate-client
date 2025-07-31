//todo cleanup/refactor
'use client';

import { Button } from '@/components/button';
import { InputBase } from '@/components/input-base';
import { ChevronRight } from '@/icons/chevron-right';
import type { CardProps } from '@mui/material';
import { Slider } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { MouseEvent, useEffect, useState } from 'react';
import { FilterCard } from './filter-card';

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

  const showClearButton = !!queryMin || !!queryMax;

  return (
    <FilterCard
      title={title}
      field={field}
      onClear={showClearButton ? handleClear : undefined}
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
          className="bg-dark-grey hover:bg-dark-grey-dark min-w-fit py-1"
          variant="contained"
          onClick={handleClick}
        >
          <ChevronRight fontSize="small" />
        </Button>
      </div>
    </FilterCard>
  );
};
