'use client';

import { usePageLoading } from '@/store/page-loading';
import { Pagination as MuiPagination } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useTransition } from 'react';

interface PaginationProps {
  count: number;
}

export const PaginationParam = ({ count }: PaginationProps) => {
  const { setIsPageLoading } = usePageLoading();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const pageParam = searchParams.get('page');
  const page = pageParam ? Number.parseInt(pageParam) : 1;
  const [isPending, startTransition] = useTransition();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const params = new URLSearchParams(searchParams);

    if (value !== 1) {
      params.set('page', value.toString());
    } else {
      params.delete('page');
    }

    startTransition(() => {
      push(`?${params.toString()}`);
    });
  };

  useEffect(() => {
    setIsPageLoading(isPending);
  }, [isPending]);

  return (
    <MuiPagination
      count={count}
      variant="outlined"
      color="primary"
      page={page}
      onChange={handlePageChange}
    />
  );
};
