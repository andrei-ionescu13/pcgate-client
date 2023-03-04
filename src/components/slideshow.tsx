import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { Box, ButtonBase } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import { Link } from "./link";
import { AppImage } from "./app-image";
import Typography from "@mui/material/Typography";

interface SlideshowItem {
  slug: string;
  title: string;
  description: string;
  isDeal: boolean;
  cover: {
    public_id: string
  },
}

interface SlideshowProps {
  items: SlideshowItem[];
}

export const Slideshow: FC<SlideshowProps> = (props) => {
  const { items } = props;
  const slides = items.map((item) => ({
    ...item,
    href: `/${item.isDeal ? 'deals' : 'collections'}/${item.slug}`,
    image: item.cover.public_id
  }))

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
          position: 'absolute'
        },
        '& .swiper-pagination-bullet-active': {
          backgroundColor: '#fff',
        }
      }}
    >
      <Swiper
        enabled={slides.length > 1}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{
          'delay': 8000,
          'disableOnInteraction': true
        }}
        loop
        navigation={{
          nextEl: '.slideshow-swiper-button-next',
          prevEl: '.slideshow-swiper-button-prev',
        }}
        pagination={{
          clickable: true
        }}
      >
        <ButtonBase
          className="slideshow-swiper-button-prev"
          disableRipple
          sx={{
            position: 'absolute',
            left: 0,
            zIndex: 999999,
            top: 0,
            bottom: 0,
            px: 1.5,
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgb(255,255,255,0.12)',
            }
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </ButtonBase>
        {slides.map((slide) => (
          <SwiperSlide key={slide.href}>
            <Link
              href={slide.href}
              sx={{
                display: 'block',
                position: 'relative'
              }}
            >
              <AppImage
                priority
                src={slide.image}
                alt=""
                width={16}
                height={9}
                layout="responsive"
              />
              <Box
                sx={{
                  inset: 0,
                  position: 'absolute',
                  p: 3,
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <Box>
                  <Typography
                    color="primary"
                    variant="h2"
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    color="textPrimary"
                    variant="h5"
                  >
                    {slide.description}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
        <ButtonBase
          className="slideshow-swiper-button-next"
          disableRipple
          sx={{
            position: 'absolute',
            right: 0,
            zIndex: 999999,
            top: 0,
            bottom: 0,
            px: 1.5,
            color: '#fff',
            '&:hover': {
              backgroundColor: 'rgb(255,255,255,0.12)',
            }
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </ButtonBase>
      </Swiper>
    </Box>
  );
};
