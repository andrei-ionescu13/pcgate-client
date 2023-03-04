import { useState } from 'react';
import type { FC, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Typography,
  styled,
  InputBase
} from '@mui/material';
import type { CardProps } from '@mui/material';

interface FilterCardCheckboxProps extends CardProps {
  title: string;
  limit?: number;
  minItems?: number;
  field: string;
  items: Array<{ label: string; value: string; }>
}

const FilterCardCheckboxRoot = styled(Card)(({ theme }) => ({
  boxShadow: `0px 0px 0px 2px ${theme.palette.background.neutral}`
}))

export const FilterCardCheckbox: FC<FilterCardCheckboxProps> = (props) => {
  const { title, limit = 12, field, items, minItems = 4, ...rest } = props;
  const [keyword, setKeyword] = useState('');
  const [showMore, setshowMore] = useState(false);
  const { pathname, query, push } = useRouter();
  const queryValues = query?.[field]
  const convertedQueryValues: string[] = !queryValues ? [] : (typeof queryValues === 'string' ? [queryValues] : queryValues);
  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase()));
  const slicedItems = filteredItems.slice(0, (showMore ? limit : minItems));

  const handleShowMoreChange = (event: MouseEvent<HTMLButtonElement>) => {
    setshowMore((prev) => !prev);
  }

  const handleClick = (value: string) => {
    let tempQuery = [...convertedQueryValues]

    if (convertedQueryValues?.includes(value)) {
      tempQuery = convertedQueryValues.filter((_value) => _value !== value)
    } else {
      tempQuery = [...convertedQueryValues, value]
    }

    const newQuery = {
      ...query,
      page: [],
      [field]: tempQuery
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
      [field]: []
    };

    push({
      pathname: pathname,
      query: newQuery
    },
      undefined,
      { shallow: true });
  }

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setKeyword(event.target.value);
  }

  return (
    <FilterCardCheckboxRoot
      elevation={0}
      {...rest}
    >
      <Box
        sx={{
          backgroundColor: 'background.neutral',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          color="textPrimary"
          variant="h6"
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1 }} />
        {!!convertedQueryValues.length && (
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
        {items.length > limit && (
          <Box mb={1}>
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
                    color: (theme) => theme.palette.text.disabled
                  }
                }
              }}
              placeholder="Search..."
              value={keyword}
              onChange={handleKeywordChange}
            />
          </Box>
        )}
        <FormGroup>
          {slicedItems.map((item) => (
            <FormControlLabel
              sx={{ userSelect: 'none' }}
              key={item.value}
              control={<Checkbox color="secondary" onChange={() => { handleClick(item.value) }} checked={convertedQueryValues?.includes(item.value)} />}
              label={item.label}
              componentsProps={{
                typography: { variant: 'body3' }
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
                }
              }}
            >
              <Typography
                color="inherit"
                variant="body2"
                sx={{ fontWeight: 600 }}
              >
                {`Show ${showMore ? 'less' : 'more'}`}
              </Typography>
            </ButtonBase>
          )}
        </FormGroup>
      </CardContent>
    </FilterCardCheckboxRoot>
  )
}
