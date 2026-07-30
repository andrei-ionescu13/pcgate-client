'use client';

import { Button } from '@/components/button';
import { useRouter } from '@/i18n/navigation';
import { usePageLoading } from '@/store/page-loading';
import { useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

interface ProductsFilterChipProps {
  field: string;
  value: string;
}

export const ProductsFilterChip = ({
  field,
  value,
}: ProductsFilterChipProps) => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setIsPageLoading } = usePageLoading();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete(field, value);

    startTransition(() => {
      push(`?${params.toString()}`);
    });
  };

  useEffect(() => {
    setIsPageLoading(isPending);

    return () => {
      setIsPageLoading(false);
    };
  }, [isPending]);

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
