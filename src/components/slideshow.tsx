'use client';

import { Link } from '@/i18n/navigation';
import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import { Box } from '@mui/material';
import type { FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AppImage } from './app-image';
import { Button } from './button';

interface SlideshowItem {
  slug: string;
  title: string;
  description: string;
  isDeal: boolean;
  cover: {
    public_id: string;
  };
}

interface SlideshowProps {
  items: SlideshowItem[];
}

export const Slideshow: FC<SlideshowProps> = (props) => {
  const { items } = props;
  const slides = items.map((item) => ({
    ...item,
    href: `/deals/${item.slug}`,
    image: item.cover.public_id,
  }));

  return (
    <Box
      sx={{
        '& .swiper': {
          position: 'relative',
        },
        '& .swiper-button-next, & .swiper-button-prev': {
          color: '#fff',
          width: 'auto',
          height: 'auto',
          fontSize: 8,
          position: 'absolute',
        },
        '& .swiper-button-lock': {
          display: 'none',
        },
      }}
    >
      <Swiper
        enabled={slides.length > 1}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 8000,
          disableOnInteraction: true,
        }}
        loop
        navigation={{
          nextEl: '.slideshow-swiper-button-next',
          prevEl: '.slideshow-swiper-button-prev',
        }}
      >
        <Button className="slideshow-swiper-button-prev absolute top-0 bottom-0 left-0 z-20 rounded-r-none px-3">
          <ChevronLeftIcon fontSize="large" />
        </Button>
        {slides.map((slide) => (
          <SwiperSlide key={slide.href}>
            <Link
              href={slide.href}
              className="relative block aspect-video"
            >
              <AppImage
                priority
                src={slide.image}
                alt=""
                fill
              />
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h2 className="text-primary">{slide.title}</h2>
                  <h5>{slide.description}</h5>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
        <Button className="slideshow-swiper-button-next absolute top-0 right-0 bottom-0 z-20 rounded-l-none px-3">
          <ChevronRightIcon fontSize="large" />
        </Button>
      </Swiper>
    </Box>
  );
};
