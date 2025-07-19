'use client';
import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import type { Article } from '@/types/articles';
import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BlogSlideshowArticle } from './blog-slideshow-article';

interface BlogSlideshowProps {
  articles: Article[];
}

const BlogSlideshowRoot = styled(Box)(({ theme }) => ({
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
    zIndex: 10,
    '&:hover': {
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
    },
  },
  '& .swiper-button-disabled': {
    display: 'none',
  },
}));

export const BlogSlideshow: FC<BlogSlideshowProps> = (props) => {
  const { articles } = props;

  return (
    <BlogSlideshowRoot>
      <div className="relative">
        <IconButton
          color="primary"
          className="custom-swiper-button-prev"
          sx={{ left: -20 }}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          className="custom-swiper-button-next"
          sx={{ right: -20 }}
        >
          <ChevronRightIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.custom-swiper-button-next',
            prevEl: '.custom-swiper-button-prev',
          }}
          pagination={{
            el: '.swiper-custom-pagination',
            clickable: true,
          }}
          slidesPerView={1}
        >
          {articles?.map((article, index) => (
            <SwiperSlide key={article._id}>
              <BlogSlideshowArticle article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="swiper-custom-pagination mt-3 flex justify-center" />
    </BlogSlideshowRoot>
  );
};
