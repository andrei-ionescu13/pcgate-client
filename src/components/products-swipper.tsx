import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/system';
import { ProductCard } from './product-card';
import type { Product } from '../types/product';

interface ProductsSwipperProps {
  loading?: boolean;
  products?: Product[];
  sx?: SxProps;
}

const ProductsSwipperRoot = styled(Box)(
  ({ theme }) => ({
    '& .swiper': {
      width: '100%',
      height: '100%',
    },
    '& .swiper-slide': {
      height: 'auto'
    },
    '& .swiper-container': {
      paddingTop: '5px',
      paddingLeft: '5px',
      marginLeft: '-5px',
      paddingBottom: theme.spacing(6),
      '&:hover': {
        '& .swiper-button-next, & .swiper-button-prev': {
          display: 'block'
        }
      }
    },
    '& .swiper-button-prev': {
      left: 5
    },
    '& .swiper-button-next': {
      right: 0
    },
    '& .swiper-button-next, & .swiper-button-prev': {
      display: 'none',
      top: 'calc(50% - 32px)',
      color: '#fff',
      width: 'auto',
      height: 'auto',
      padding: theme.spacing(1),
      fontSize: 8
    }
  }));

SwiperCore.use([Pagination, Navigation]);


export const ProductsSwipper: FC<ProductsSwipperProps> = (props) => {
  const { products, loading, ...rest } = props;
  const theme = useTheme();
  const breakpoints = theme.breakpoints.values;

  const getContent = () => {
    if (loading) {
      return (
        <Grid
          container
          spacing={3}
        >
          {[1, 2, 3, 4].map((item) => (
            <Grid
              item
              key={item}
              lg={3}
              md={4}
              sm={6}
              xs={12}
            >
              <ProductCard loading />
            </Grid>
          ))}
        </Grid>
      );
    }

    return (
      <Swiper
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
            slidesPerView: 1,
            slidesPerGroup: 1
          }
        }}
        loop={true}
        loopFillGroupWithBlank={true}
        navigation={true}
        pagination={{
          clickable: true
        }}
        spaceBetween={24}
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  };

  return (
    <ProductsSwipperRoot {...rest}>
      {getContent()}
    </ProductsSwipperRoot>
  );
};
