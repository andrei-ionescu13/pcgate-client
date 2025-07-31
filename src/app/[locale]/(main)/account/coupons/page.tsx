import { SearchParam } from '@/components/search-param';
import Head from 'next/head';
import { searchCoupons } from './api';
import { CouponList } from './coupon-list';

interface CouponsProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const Coupons = async (props: CouponsProps) => {
  const searchParams = await props.searchParams;
  const data = await searchCoupons(searchParams);

  return (
    <>
      <Head>
        <title>Order</title>
      </Head>
      <div>
        <h4 className="mb-6">Coupons</h4>
        <div className="mb-10 rounded-md bg-[#12171E]">
          <SearchParam />
        </div>
        <CouponList initialData={data} />
      </div>
    </>
  );
};

export default Coupons;
