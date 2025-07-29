'use client';

import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import { Product } from '@/types/product';
import { useEffect, useState, type FC } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BREAKPOINTS } from 'theme';
import { IconButton } from './icon-button';
import { ProductCard } from './product-card';
import './products-swiper.scss';

interface ProductsSwiperProps {
  products?: Product[];
}

export const ProductsSwiper: FC<ProductsSwiperProps> = (props) => {
  const { products } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="grid gap-4 pb-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {!!products?.[0] && <ProductCard product={products[0]} />}
        {!!products?.[1] && (
          <ProductCard
            product={products[1]}
            className="hidden sm:block"
          />
        )}
        {!!products?.[2] && (
          <ProductCard
            product={products[2]}
            className="hidden md:block"
          />
        )}
        {!!products?.[3] && (
          <ProductCard
            product={products[3]}
            className="hidden lg:block"
          />
        )}
      </div>
    );

  return (
    <div className="products-swiper">
      <div className="relative">
        <IconButton className="products-swiper-button-prev -left-5 hidden md:inline-flex">
          <ChevronLeftIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Pagination]}
          breakpoints={{
            [BREAKPOINTS.lg]: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            [BREAKPOINTS.md]: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
            [BREAKPOINTS.sm]: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
            [BREAKPOINTS.xs]: {
              slidesPerView: 1,
              slidesPerGroup: 1,
            },
          }}
          navigation={{
            nextEl: '.products-swiper-button-next',
            prevEl: '.products-swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-custom-pagination',
            clickable: true,
          }}
          spaceBetween={16}
          resistanceRatio={0.6}
        >
          {products?.map((product) => (
            <SwiperSlide
              key={product._id}
              className="h-auto"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton className="products-swiper-button-next -right-5 hidden md:inline-flex">
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className="swiper-custom-pagination mt-4 flex justify-center" />
    </div>
  );
};
