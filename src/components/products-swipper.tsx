import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Box, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { ProductCard } from './product-card';
import { Product } from "@/types/product";

interface ProductsSwipperProps {
  loading?: boolean;
  products?: Product[];
  sx?: SxProps;
}

const ProductsSwipperRoot = styled(Box)(
  ({ theme }) => ({
    '& .swiper': {
      height: '100%',
      width: '100%',
      borderRadius: 8
    },
    '& .swiper-pagination-bullet ': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'pointer',
      marginInline: theme.spacing(0.25)
    },
    '& .custom-swiper-button-next, & .custom-swiper-button-prev': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      opacity: 0.72,
      position: 'absolute',
      top: "calc(50% - 20px)",
      zIndex: 999999,
      '&:hover': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
      },
      [theme.breakpoints.up('md')]: {
        display: 'inline-flex'
      },
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    '& .custom-swiper-button-prev': {
      left: -20
    },
    '& .custom-swiper-button-next': {
      right: -20
    },
    '& .swiper-button-disabled': {
      display: 'none'
    }
  }));


export const ProductsSwipper: FC<ProductsSwipperProps> = (props) => {
  const { products, loading, ...rest } = props;
  const theme = useTheme();
  const breakpoints = theme.breakpoints.values;

  return (
    <ProductsSwipperRoot {...rest}>
      <Box sx={{ position: 'relative' }}>
        <IconButton className="custom-swiper-button-prev" >
          <ChevronLeftIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Pagination]}
          breakpoints={{
            [breakpoints.lg]: {
              slidesPerView: 4,
              slidesPerGroup: 4
            },
            [breakpoints.md]: {
              slidesPerView: 3,
              slidesPerGroup: 3
            },
            [breakpoints.sm]: {
              slidesPerView: 2,
              slidesPerGroup: 2

            },
            [breakpoints.xs]: {
              slidesPerView: 2,
              slidesPerGroup: 2,
            }
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
        <IconButton className="custom-swiper-button-next"  >
          <ChevronRightIcon />
        </IconButton>
      </Box>
      <Box
        className="swiper-custom-pagination"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      />
    </ProductsSwipperRoot>
  );
};
