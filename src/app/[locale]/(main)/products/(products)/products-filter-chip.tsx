import { ButtonBase } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import type { FC, MouseEvent } from 'react';

interface ProductsFilterChipProps {
  field: string;
  value: string;
}

export const ProductsFilterChip: FC<ProductsFilterChipProps> = (props) => {
  const { field, value } = props;
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const params = new URLSearchParams(searchParams);
    params.delete(field, value);

    window.history.pushState(null, '', '?' + params.toString());
  };

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
        },
      }}
    >
      <p className="text-text-secondary caption leading-1">{field}</p>
      <p className="subtitle3 leading-0">{value}</p>
    </ButtonBase>
  );
};
