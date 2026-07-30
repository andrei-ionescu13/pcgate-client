import { DataOverlay } from '@/components/data-overlay';
import { NoData } from '@/components/no-data';
import { PaginationParam } from '@/components/pagination-param';
import { SearchParam } from '@/components/search-param';
import Head from 'next/head';
import { searchCoupons } from './api';
import { Coupon } from './coupon';

interface CouponsProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

const Coupons = async ({ searchParams }: CouponsProps) => {
  const params = await searchParams;
  const data = await searchCoupons(params);
  const { promoCodes, count } = data;
  console.log(promoCodes, count);
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
        <div>
          {!promoCodes.length ? (
            <NoData />
          ) : (
            <>
              <DataOverlay>
                <div className="grid gap-4">
                  {promoCodes.map((promoCode) => (
                    <Coupon
                      coupon={promoCode}
                      key={promoCode._id}
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
      </div>
    </>
  );
};

export default Coupons;
