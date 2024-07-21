import { useEffect, useState } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import type { SxProps } from '@mui/system';
import { SearchInput } from '../components/search-input';
import { SearchItem } from './search-item';
import { useFocused } from '@/hooks/use-focused';
import { appFetch } from '@/utils/app-fetch';
import { Product } from '@/types/product';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useTheme } from '@mui/material/styles';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SearchProps {
  sx?: SxProps;
  isFocused?: boolean;
  onBlur?: any;
}

const SearchRoot = styled('div')({
  position: 'relative'
});

const getProducts = (keyword: string) => () => appFetch<{ count: number, products: Product[] }>({
  url: '/products',
  withAuth: true,
  query: { keyword }
})

export const Search: FC<SearchProps> = (props) => {
  const { isFocused = false, onBlur, ...rest } = props;
  const { push } = useRouter();
  const query: any = {};
  const searchParams = useSearchParams();

  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }
  const pathname = usePathname();
  const [keyword, setKeyword] = useState<string>(query?.keyword as string || '');
  const [ref, focused, setFocused] = useFocused(isFocused);
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts(keyword),
    enabled: keyword.length >= 3,
    placeholderData: !!keyword ? keepPreviousData : undefined,
  })
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event?.target.value);
    setFocused(true);
  };

  const handleSearch = (): void => {
    //todo change this
    // push({
    //   pathname: '/games',
    //   query: { keyword }
    // })
    setFocused(false);
  };

  const handleSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    setFocused(false)
    handleSearch();
  };


  const getDropdownContent = () => {
    if (isLoading || !data) return null;
    const { products, count } = data;

    if (products.length === 0) {
      return (
        <Box
          sx={{
            display: 'grid',
            gap: 1.5,
            gridAutoFlow: 'row',
            justifyItems: 'center',
            p: 3
          }}
        >
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle1"
          >
            There were no results
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            variant="body2"
          >
            We couldn&apos;t find any results for you. Try adjusting the terms of your search. You can search for games by name or publisher.
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              push('/search');
              setKeyword('');
              setFocused(false);
            }}
          >
            View all deals
          </Button>
        </Box>
      );
    }

    return (
      <Box>
        {products.map((product) => (
          <SearchItem
            key={product._id}
            product={product}
          />
        ))}
        {count > 5 && (
          <Box
            sx={{
              cursor: 'pointer',
              display: 'block',
              p: 1.5,
              backgroundColor: 'rgba(0, 0, 0, 0.16)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.28)',
              }
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              onClick={handleSearch}
              variant="body1"
            >
              View all
              {' '}
              {count}
              {' '}
              results
            </Typography>
          </Box>
        )}
      </Box>
    );

  };

  const getContent = () => {
    if (focused && data?.products) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            left: 0,
            position: {
              md: 'absolute'
            },
            right: 0,
            top: 40,
            zIndex: 1000
          }}
        >
          {getDropdownContent()}
        </Box>
      );
    }
  };

  // useEffect(() => {
  //   setFocused(false)
  // }, [pathname, setFocused])

  useEffect(() => {
    setKeyword(query.keyword as string || '')
  }, [query.keyword])

  useEffect(() => {
    setFocused(false);
  }, [pathname])

  return (
    <SearchRoot
      {...rest}
      ref={ref}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <SearchInput
          inputProps={{ onFocus: () => { setFocused(true); } }}
          onChange={handleQueryChange}
          value={keyword}
          sx={{
            ...(focused && ((data?.products && mdUp) || (!mdUp && data?.products?.length && !isLoading))) && ({
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0
            })
          }}
        />
      </form>
      {getContent()}
    </SearchRoot>
  );
};
