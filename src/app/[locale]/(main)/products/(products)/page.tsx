import { ProductList } from '@/components/product-list';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import { ViewModeButton } from '@/components/view-mode-button';
import { Container } from '@mui/material';
import Head from 'next/head';
import { searchProducts } from '../../api-calls';
import { ProductsDrawer } from './products-drawer';
import { ProductsFilterChip } from './products-filter-chip';
import { ProductsFilters } from './products-filters';

const sortByitems = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'price_asc',
    label: 'Price low',
  },
  {
    value: 'price_desc',
    label: 'Price heigh',
  },
  {
    value: 'discount',
    label: 'Discount',
  },
  {
    value: 'release_date',
    label: 'Release Date',
  },
];

interface ProductsProps {
  searchParams: Promise<{
    publishers?: string | string[];
    developers?: string | string[];
    features?: string | string[];
    os?: string | string[];
    platforms?: string | string[];
    genres?: string | string[];
    sortBy?: string;
    price_min?: string;
    price_max?: string;
  }>;
}

export default async function Products(props: ProductsProps) {
  const searchParams = await props.searchParams;
  const query = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      Array.isArray(value) ? value : [value],
    ])
  );

  const data = await searchProducts(query);
  const { products, productCount, filters } = data;
  const chips: Array<[string, string]> = [];
  const chipFor = [
    'price_min',
    'price_max',
    'os',
    'platforms',
    'genres',
    'publishers',
    'developers',
    'features',
  ];

  chipFor.forEach((chip) => {
    query[chip]?.forEach((value) => chips.push([chip, value]));
  });

  const {
    platforms,
    genres,
    publishers,
    developers,
    features,
    operatingSystems,
  } = filters;

  return (
    <div>
      <>
        <Head>
          <title>Store</title>
        </Head>

        <div className="py-10">
          <Container maxWidth="lg">
            <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-[220px_1fr]">
              <div />
              <div className="grid w-full gap-2">
                <div className="flex w-full gap-2">
                  <ProductsDrawer {...filters} />
                  <div className="flex-1" />
                  <div className="hidden md:block">
                    <ViewModeButton />
                  </div>
                  <SortByPopoverQuery
                    items={sortByitems}
                    defaultValue={'name'}
                  />
                </div>
                <div className="flex justify-end md:hidden">
                  <ViewModeButton />
                </div>
                <div className="flex flex-wrap gap-2">
                  {chips.map(([key, value]) => (
                    <ProductsFilterChip
                      key={`${key}-${value}`}
                      field={key}
                      value={value}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden md:block">
                <ProductsFilters
                  platforms={platforms}
                  genres={genres}
                  publishers={publishers}
                  developers={developers}
                  features={features}
                  operatingSystems={operatingSystems}
                />
              </div>
              <div>
                <ProductList
                  products={products}
                  // viewMode={viewMode}
                />
                {Math.ceil(productCount / 36) > 1 && (
                  <div className="mt-20 flex justify-center">
                    <PaginationParam count={Math.ceil(productCount / 36)} />
                  </div>
                )}
              </div>
            </div>
          </Container>
        </div>
      </>
    </div>
  );
}
