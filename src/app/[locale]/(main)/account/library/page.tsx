import { SearchParam } from '@/components/search-param';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import Head from 'next/head';
import { searchLibrary } from './api';
import { Items } from './items';

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
  const data = await searchLibrary(searchParams);

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
        <Items initialData={data} />
      </div>
    </>
  );
};

export default Library;
