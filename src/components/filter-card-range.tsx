import { useState, useEffect, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import type { FC, ChangeEvent } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  styled,
  Button,
  InputBase,
  Slider
} from '@mui/material';
import type { CardProps } from '@mui/material';
import Chip from '@mui/material/Chip';
import { ChevronRight } from '@/icons/chevron-right';
import { ParsedUrlQuery } from 'querystring';

interface FilterCardProps extends CardProps {
  title: string;
  field: string;
  min: number;
  max: number;
}

const initializeRange = (query: ParsedUrlQuery, field: string, min: number, max: number): [number, number] => {
  try {
    let rangeMin = query?.[`${field}_min`] ? Number.parseFloat(query[`${field}_min`] as string) : min;
    let rangeMax = query?.[`${field}_max`] ? Number.parseFloat(query[`${field}_max`] as string) : max;

    rangeMin = rangeMin <= max ? rangeMin : min;
    rangeMax = rangeMax >= min ? rangeMax : max;
    return [rangeMin, rangeMax];
  } catch (error) {
    return [min, max];
  }
}

const FilterCardRangeRoot = styled(Card)(({ theme }) => ({
  boxShadow: `0px 0px 0px 2px ${theme.palette.background.neutral}`
}))

function valuetext(value: number) {
  return `${value}312`;
}
export const FilterCardRange: FC<FilterCardProps> = (props) => {
  const { title, field, min, max, ...rest } = props;
  const { pathname, query, push } = useRouter();
  const queryValuesMin = query?.[`${field}_min`]
  const queryValuesMax = query?.[`${field}_max`]
  const convertedQueryValuesMin: string[] = !queryValuesMin ? [] : (typeof queryValuesMin === 'string' ? [queryValuesMin] : queryValuesMin);
  const convertedQueryValuesMax: string[] = !queryValuesMax ? [] : (typeof queryValuesMax === 'string' ? [queryValuesMax] : queryValuesMax);
  const [range, setRange] = useState<number[]>(initializeRange(query, field, min, max));
  const [inputMin, setInputMin] = useState(range[0]);
  const [inputMax, setInputMax] = useState(range[1]);

  const handleRangeChange = (event: Event, newValue: number | number[]) => {
    setRange(newValue as number[]);
    if (typeof newValue !== 'number') {
      setInputMin(newValue[0])
      setInputMax(newValue[1])
    }
  };

  const handleMinChange = (event: ChangeEvent<HTMLInputElement>): void => {
    try {
      const value = Number.parseFloat(event.target.value);
      setInputMin(value)

      if (value <= range[1]) {
        const temp = [...range];
        temp[0] = value;
        setRange(temp)
      }
    } catch (error) {
    }
  }

  const handleMaxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    try {
      const value = Number.parseFloat(event.target.value);
      setInputMax(value);

      if (value >= range[0]) {
        const temp = [...range];
        temp[1] = value;
        setRange(temp);
      }
    } catch (error) {
    }
  }

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const newQuery = {
      ...query,
      page: [],
      [`${field}_min`]: range[0] !== min ? range[0] : [],
      [`${field}_max`]: range[1] !== max ? range[1] : []
    };

    push({
      pathname: pathname,
      query: newQuery
    },
      undefined,
      { shallow: true });
  }

  const handleClear = () => {
    const newQuery = {
      ...query,
      page: [],
      [`${field}_min`]: [],
      [`${field}_max`]: [],
    };

    push({
      pathname: pathname,
      query: newQuery
    },
      undefined,
      { shallow: true });
  }

  useEffect(() => {
    setRange(initializeRange(query, field, min, max));
  }, [query, field, min, max])

  useEffect(() => {
    setInputMin(range[0])
    setInputMax(range[1])
  }, [range])

  return (
    <FilterCardRangeRoot
      elevation={0}
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: 'background.neutral',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1 }} />
        {(!!convertedQueryValuesMin.length || !!convertedQueryValuesMax.length) && (
          <Chip
            label="Clear"
            variant="outlined"
            size="small"
            onClick={handleClear}
          />
        )}
      </Box>
      <CardContent
        sx={{
          py: 1,
          maxHeight: 360,
          overflow: 'auto',
          "&::-webkit-scrollbar": {
            width: "3px",
            backgroundColor: 'background.neutral'

          },

          "&::-webkit-scrollbar-track": {
            borderRadius: "10px",

          },

          "&::-webkit-scrollbar-thumb": {
            background: (theme) => theme.palette.grey[500],
            borderRadius: "10px",
          },

          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgb(255, 251, 251)",
          }
        }}
      >
        <Box px={1.5} pt={4} pb={2}>
          <Slider
            disableSwap
            color="secondary"
            getAriaLabel={() => 'Temperature range'}
            value={range}
            onChange={handleRangeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={min}
            max={max}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 0.5
          }}
        >
          <InputBase
            type="number"
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              px: 1.5,
              fontSize: 14,
              fontWeight: 'normal',
              '& input': {
                color: (theme) => theme.palette.text.primary,
                py: 0.5,
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  margin: 0,
                  appearance: 'none'
                },
                '&[type=number]': {
                  appearance: 'textfield'
                },
                '&::placeholder': {
                  color: (theme) => theme.palette.text.disabled
                }
              }
            }}
            placeholder="Min"
            value={inputMin}
            onChange={handleMinChange}
          />
          <Typography
            color="textSecondary"
            variant="body1"
            sx={{ verticalAlign: 'middle' }}
          >
            -
          </Typography>
          <InputBase
            type="number"
            sx={{
              border: (theme) => `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              px: 1.5,
              fontSize: 14,
              fontWeight: 'normal',
              '& input': {
                color: (theme) => theme.palette.text.primary,
                py: 0.5,
                '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                  margin: 0,
                  appearance: 'none'
                },
                '&[type=number]': {
                  appearance: 'textfield'
                },
                '&::placeholder': {
                  color: (theme) => theme.palette.text.disabled
                }
              }
            }}
            placeholder="Max"
            value={inputMax}
            onChange={handleMaxChange}
          />
          <Button
            sx={{ py: 0.5, px: 1, minWidth: 'fit-content' }}
            color="darkGrey"
            variant="contained"
            onClick={handleClick}
          >
            <ChevronRight fontSize="small" />
          </Button>
        </Box>
      </CardContent>
    </FilterCardRangeRoot>
  )
}
