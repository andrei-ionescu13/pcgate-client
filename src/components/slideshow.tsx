import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import { Box } from '@mui/material';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const slides = [
  'https://cdn.cdkeys.com/media/home_slider/re-dbd-956x528-EN.jpg',
  'https://cdn.cdkeys.com/media/home_slider/Scarletnexus/EN-scarlet-nexus-956x528-EN.jpg',
  'https://cdn.cdkeys.com/media/home_slider/gg-956x528-EN.jpg',
];

export const Slideshow: FC = () => {
  return (
    <Box
      sx={{
        '& img': {
          maxWidth: '100%'
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          color: '#fff',
          width: 'auto',
          height: 'auto',
          fontSize: 8
        },
        '& .swiper-pagination-bullet-active': {
          backgroundColor: '#fff',
        }
      }}
    >
      <Swiper
        autoplay={{
          'delay': 2500,
          'disableOnInteraction': false
        }}
        loop={true}
        navigation={true}
        pagination={{
          clickable: true
        }}
      >
        {slides?.map((slide) => (
          <SwiperSlide key={slide}>
            <img
              alt=""
              src={slide}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
