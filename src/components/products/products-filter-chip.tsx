import type { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { ButtonBase, Typography, } from '@mui/material';

interface ProductsFilterChipProps {
  field: string;
  value: string;
}

export const ProductsFilterChip: FC<ProductsFilterChipProps> = (props) => {
  const { field, value } = props;
  const { pathname, query, push } = useRouter();
  const queryValues = query?.[field]
  const convertedQueryValues: string[] = !queryValues ? [] : (typeof queryValues === 'string' ? [queryValues] : queryValues);

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    let tempQuery = [...convertedQueryValues]
    tempQuery = convertedQueryValues.filter((_value) => _value !== value)

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

  return (
    <ButtonBase
      onClick={handleClick}
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) => theme.palette.background.neutral,
        width: 'fit-content',
        borderRadius: 1,
        px: 1,
        py: 0.5,
        cursor: 'pointer',
        '&:hover': {
          background: (theme) => theme.palette.action.focus,
        }
      }}
    >
      <Typography
        color="textSecondary"
        variant="caption"
        sx={{
          fontSize: '0.625rem',
          lineHeight: 1.6,
        }}
      >
        {field}
      </Typography>
      <Typography
        color="textPrimary"
        variant="subtitle3"
        sx={{ lineHeight: 1.23 }}
      >
        {value}
      </Typography>
    </ButtonBase>
  )
}