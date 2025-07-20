import { useFocused } from '@/hooks/use-focused';
import { Product } from '@/types/product';
import { appFetch } from '@/utils/app-fetch';
import { cn } from '@/utils/cn';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ChangeEvent, ComponentProps, FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { Search } from '../components/search-input';
import { SearchItem } from './search-item';

interface SearchProductsProps extends ComponentProps<'div'> {
  isFocused?: boolean;
  onBlur?: any;
}

const getProducts = (keyword: string) => () =>
  appFetch<{ count: number; products: Product[] }>({
    url: '/products',
    withAuth: true,
    query: { keyword },
  });

export const SearchProducts: FC<SearchProductsProps> = (props) => {
  const { className, ...rest } = props;
  const { push } = useRouter();
  const query: any = {};
  const searchParams = useSearchParams();
  const [enabled, setEnabled] = useState(false);
  const [previousData, setPreviousData] = useState<
    | {
        count: number;
        products: Product[];
      }
    | undefined
  >();

  for (const [key, value] of searchParams.entries()) {
    query[key] = value;
  }

  const pathname = usePathname();
  const [keyword, setKeyword] = useState<string>(
    (query?.keyword as string) || ''
  );

  const [ref, focused, setFocused] = useFocused(false);
  const { data, isRefetching, isLoading, isFetching, isPending } = useQuery({
    queryKey: ['products', keyword],
    queryFn: getProducts(keyword),
    enabled: enabled,
  });

  useEffect(() => {
    if (!keyword) {
      setPreviousData(undefined);
      return;
    }

    !!data && setPreviousData(data);
  }, [data, keyword]);

  useEffect(() => {
    setEnabled((prev) => {
      if (keyword.length >= 3) {
        return true;
      }

      if (prev && !keyword.length) {
        return false;
      }

      return prev;
    });
  }, [keyword]);

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event?.target.value);
    setFocused(true);
  };

  const handleSearch = () => {
    setFocused(false);
  };

  const handleSubmit = (event: FormEvent<EventTarget>) => {
    event.preventDefault();
    setFocused(false);
    handleSearch();
  };

  const getDropdownContent = () => {
    if ((!previousData && !data) || !enabled) return null;

    const { products, count } = data ||
      previousData || { products: [], count: 0 };

    if (products.length === 0) {
      return (
        <div className="grid grid-flow-row justify-items-center gap-3 p-6">
          <p className="subtitle1 text-center">There were no results</p>
          <p className="text-text-secondary body2 text-center">
            We couldn&apos;t find any results for you. Try adjusting the terms
            of your search. You can search for games by name or publisher.
          </p>
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
        </div>
      );
    }

    return (
      <div>
        <div className="divide-divider divide-y">
          {products.map((product) => (
            <SearchItem
              key={product._id}
              product={product}
            />
          ))}
        </div>
        {count > 5 && (
          <div className="block cursor-pointer bg-[rgba(0,0,0,0.16)] p-3 hover:bg-[rgba(0,0,0,0.28)]">
            <p
              className="text-center"
              onClick={handleSearch}
            >
              View all {count} results
            </p>
          </div>
        )}
      </div>
    );
  };

  const showProductsContainer =
    focused && (previousData?.products || data?.products);

  const getContent = () => {
    if (showProductsContainer) {
      return (
        <div className="bg-paper top-10 right-0 left-0 z-20 md:absolute">
          {getDropdownContent()}
        </div>
      );
    }
  };

  useEffect(() => {
    setKeyword((query.keyword as string) || '');
  }, [query.keyword]);

  useEffect(() => {
    setFocused(false);
  }, [pathname]);

  return (
    <div
      className={cn('relative', className)}
      ref={ref}
      {...rest}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%' }}
      >
        <Search
          inputProps={{
            onFocus: () => {
              setFocused(true);
            },
          }}
          onChange={handleQueryChange}
          value={keyword}
          className={showProductsContainer ? 'rounded-b-none' : ''}
        />
      </form>
      {getContent()}
    </div>
  );
};
