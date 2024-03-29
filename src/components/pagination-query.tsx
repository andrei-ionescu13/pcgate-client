import { useState, useEffect } from 'react';
import type { FC, ChangeEvent } from 'react';
import { Pagination as MuiPagination, styled } from '@mui/material';
import { PaginationProps as MuiPaginationProps } from '@mui/material';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

interface PaginationQueryProps extends MuiPaginationProps {
}

const PaginationQueryRoot = styled(MuiPagination)(({ theme }) => ({}))

const initializePage = (query: ParsedUrlQuery): number => {
  try {
    if (query?.page) {
      const parsedPage = Number.parseInt(query.page as string);

      return Number.isNaN(parsedPage) ? 1 : parsedPage;
    }

    return 1;
  } catch (error) {
    return 1;
  }
}

export const PaginationQuery: FC<PaginationQueryProps> = (props) => {
  const { ...rest } = props;
  const { pathname, query, push } = useRouter();
  const [page, setPage] = useState(initializePage(query))

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    const newQuery = {
      ...query,
      page: value !== 1 ? value : []
    };

    push({
      pathname: pathname,
      query: newQuery
    },
      undefined,
      { shallow: true });
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const newPage = initializePage(query);
    setPage(newPage)
  }, [query])

  return (
    <PaginationQueryRoot
      size='large'
      count={10}
      variant="outlined"
      color="primary"
      page={page}
      onChange={handleChange}
      {...rest}
    />
  )
}