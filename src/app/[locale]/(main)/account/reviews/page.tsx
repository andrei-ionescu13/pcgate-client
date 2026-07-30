import { DataOverlay } from '@/components/data-overlay';
import { NoData } from '@/components/no-data';
import { PaginationParam } from '@/components/pagination-param';
import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import Head from 'next/head';
import { SearchParam } from '../../../../../components/search-param';
import { searchUserReviews } from './api';
import { Review } from './review';

type ReviewsProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const sortByitems = [
  {
    value: 'createdAt',
    label: 'Added at',
  },
  {
    value: 'productTitle',
    label: 'Alphabetical',
  },
];

const Reviews = async ({ searchParams }: ReviewsProps) => {
  const params = await searchParams;
  const data = await searchUserReviews(params);
  const { reviews, count } = data;

  return (
    <>
      <Head>
        <title>Account Settings</title>
      </Head>
      <div>
        <h4 className="mb-6">Reviews</h4>
        <SearchParam />
        <div className="mt-4 mb-10">
          <SortByPopoverQuery
            items={sortByitems}
            defaultValue={'createdAt'}
          />
        </div>
        <div>
          {!reviews.length ? (
            <NoData />
          ) : (
            <>
              <DataOverlay>
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <Review
                      review={review}
                      key={review._id}
                    />
                  ))}
                </div>
              </DataOverlay>
              {count > 2 && (
                <div className="mt-10 flex justify-center">
                  <PaginationParam count={Math.ceil(count / 2)} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
