import { DataOverlay } from '@/components/data-overlay';
import { LibraryProduct } from '@/components/library-product';
import { NoData } from '@/components/no-data';
import { PaginationParam } from '@/components/pagination-param';
import { SearchParam } from '@/components/search-param';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import Head from 'next/head';
import { searchLibrary } from './api';

const sortByItems = [
  {
    value: 'createdAt',
    label: 'Added at',
  },
  {
    value: 'productTitle',
    label: 'Alphabetical',
  },
];

const Library = async ({ searchParams }) => {
  const params = await searchParams;
  const data = await searchLibrary(params);
  const { items, count } = data;

  return (
    <>
      <Head>
        <title>Account Settings</title>
      </Head>
      <div>
        <h4 className="mb-6">Library</h4>
        <SearchParam />
        <div className="mt-4 mb-10">
          <SortByPopoverQuery
            items={sortByItems}
            defaultValue="createdAt"
          />
        </div>
        {!items.length ? (
          <NoData />
        ) : (
          <>
            <DataOverlay>
              <div className="grid gap-4">
                {items.map((item) => (
                  <LibraryProduct
                    product={item.product}
                    productKey={item.key}
                    key={item._id}
                  />
                ))}
              </div>
            </DataOverlay>
            {count > 12 && (
              <div className="mt-10 flex justify-center">
                <PaginationParam count={Math.ceil(count / 12)} />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Library;
