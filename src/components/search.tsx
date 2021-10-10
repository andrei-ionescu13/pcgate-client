import { useState, useEffect } from 'react';
import type { ChangeEvent, FC, FormEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/system';
import type { SxProps } from '@material-ui/system';
import { useFocused } from '../hooks/use-focused';
import { SearchInput } from './search-input';
import { SearchItem } from './search-item';
import { AtomSpinner } from '../components/spinner';
import { useDebouncedValue } from '../hooks/use-debounced-value';
import { useFetch } from '../hooks/use-fetch';
import type { Product } from '../types/product';

interface SearchProps {
  sx?: SxProps;
}

const SearchRoot = styled('div')({
  position: 'relative'
});


export const Search: FC<SearchProps> = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [query, setQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useDebouncedValue(query, 1000);
  const [data, loading, , reset] = useFetch<{
    products: Product[];
    counts: {
      totalCount: number;
    }
  }>(
    '/products/',
    {
      method: 'POST',
      body: JSON.stringify({
        query: debouncedQuery,
        limit: 5
      })
    },
    [debouncedQuery],
    true,
    Boolean(debouncedQuery)
  );
  const [ref, focused, setFocused] = useFocused();

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event?.target.value);
    setFocused(true);
  };

  const handleSearch = (): void => {
    navigate(`/search?query=${query}`);
    setFocused(false);
  };

  const handleSubmit = (event: FormEvent<EventTarget>): void => {
    event.preventDefault();
    handleSearch();
  };

  useEffect(() => {
    setQuery('');
    setDebouncedQuery('');
  }, [pathname]);

  useEffect(() => {
    if (query.length === 0) {
      setDebouncedQuery('');
      reset();
    }
  }, [query]);

  const getDropdownContent = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            py: 1
          }}
        >
          <AtomSpinner />
        </Box>
      );
    }

    if (data?.products.length === 0) {
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
            We couldn't find any results for you. Try adjusting the terms of your search. You can search for games by name or publisher.
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              navigate('/search');
              setQuery('');
              setFocused(false);
            }}
          >
            View all deals
          </Button>
        </Box>
      );
    }

    if (data?.counts?.totalCount && data.products) {
      return (
        <Box>
          {data.products.map((product) => (
            <SearchItem
              key={product._id}
              product={product}
            />
          ))}
          {data.counts.totalCount > 5 && (
            <Typography
              align="center"
              color="textPrimary"
              sx={{
                backgroundColor: (theme) => theme.palette.mode === 'light' ? '#F0F0F0' : '#071222',
                cursor: 'pointer',
                display: 'block',
                p: 1.5,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.mode === 'light' ? '#E0E0E0' : '#050C17'
                }
              }}
              onClick={handleSearch}
              variant="body1"
            >
              View all
              {' '}
              {data.counts.totalCount}
              {' '}
              results
            </Typography>
          )}
        </Box>
      );
    }

    return null;
  };

  const getContent = () => {
    if (focused && query.length > 0 && debouncedQuery.length > 0) {
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

  return (
    <SearchRoot
      ref={ref}
      {...props}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <SearchInput
          inputProps={{ onFocus: () => { setFocused(true); } }}
          onChange={handleQueryChange}
          value={query || ''}
          sx={{
            ...(focused && query.length > 0 && debouncedQuery.length > 0) && ({
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
