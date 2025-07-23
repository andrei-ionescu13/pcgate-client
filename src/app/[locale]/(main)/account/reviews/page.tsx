import { SortByPopoverQuery } from '@/components/sort-by-popover-query';
import Head from 'next/head';
import { SearchParam } from '../../../../../components/search-param';
import { searchUserReviews } from './api';
import { ReviewList } from './review-list';

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

const Reviews = async (props: ReviewsProps) => {
  const { searchParams } = props;
  const data = await searchUserReviews(searchParams);

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
        <ReviewList initialData={data} />
      </div>
    </>
  );
};

export default Reviews;
