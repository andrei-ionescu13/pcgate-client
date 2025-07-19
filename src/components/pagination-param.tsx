'use client';

import { Pagination as MuiPagination } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { FC } from 'react';

interface PaginationProps {
  count: number;
}

export const PaginationParam: FC<PaginationProps> = (props) => {
  const { count } = props;
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const pageParam = searchParams.get('page');
  const page = pageParam ? Number.parseInt(pageParam) : 1;

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

    // push(`${pathname}?${params.toString()}`);
    //shallow routing
    window.history.pushState(null, '', '?' + params.toString());
  };

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
