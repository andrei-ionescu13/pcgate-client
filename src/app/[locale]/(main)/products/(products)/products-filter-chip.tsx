import { Button } from '@/components/button';
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
    <Button
      variant="contained"
      color="neutral"
      onClick={handleClick}
      className="flex-col items-start gap-0 rounded-xl"
      size="small"
    >
      <p className="text-text-secondary caption leading-1">{field}</p>
      <p className="subtitle3 leading-0">{value}</p>
    </Button>
  );
};
