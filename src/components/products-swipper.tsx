'use client';

import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import { Product } from '@/types/product';
import { Box, IconButton } from '@mui/material';
import type { SxProps } from '@mui/system';
import { styled } from '@mui/system';
import { useEffect, useState, type FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BREAKPOINTS } from 'theme';
import { ProductCard } from './product-card';
import { ProductCardSkeleton } from './product-card-skeleton';

interface ProductsSwipperProps {
  products?: Product[];
  sx?: SxProps;
}

const ProductsSwipperRoot = styled(Box)(({ theme }) => ({
  '& .swiper': {
    height: '100%',
    width: '100%',
    borderRadius: 8,
  },
  '& .swiper-pagination-bullet ': {
    backgroundColor: theme.palette.primary.main,
    cursor: 'pointer',
    marginInline: theme.spacing(0.25),
  },
  '& .custom-swiper-button-next, & .custom-swiper-button-prev': {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    opacity: 0.72,
    position: 'absolute',
    top: 'calc(50% - 20px)',
    zIndex: 999999,
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
    },
    [theme.breakpoints.up('md')]: {
      display: 'inline-flex',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  '& .custom-swiper-button-prev': {
    left: -20,
  },
  '& .custom-swiper-button-next': {
    right: -20,
  },
  '& .swiper-button-disabled': {
    display: 'none',
  },
}));

export const ProductsSwipper: FC<ProductsSwipperProps> = (props) => {
  const { products } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2].map((x) => (
          <ProductCardSkeleton key={x} />
        ))}
      </div>
    );

  return (
    <ProductsSwipperRoot>
      <div className="relative">
        <IconButton className="custom-swiper-button-prev">
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
              slidesPerView: 2,
              slidesPerGroup: 2,
            },
          }}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-custom-pagination',
            clickable: true,
          }}
          spaceBetween={16}
          resistanceRatio={0.6}
        >
          {products?.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton className="custom-swiper-button-next">
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className="swiper-custom-pagination mt-4 flex justify-center" />
    </ProductsSwipperRoot>
  );
};
