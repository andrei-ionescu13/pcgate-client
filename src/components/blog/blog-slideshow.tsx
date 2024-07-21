"use client"
import { Box, IconButton } from '@mui/material';
import type { Article } from '@/types/articles';
import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { styled } from '@mui/system';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BlogSlideshowArticle } from './blog-slideshow-article';

interface BlogSlideshowProps {
  articles: Article[];
}

const BlogSlideshowRoot = styled(Box)(
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
      }
    },
  }));

export const BlogSlideshow: FC<BlogSlideshowProps> = (props) => {
  const { articles } = props;

  return (
    <BlogSlideshowRoot>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          color="primary"
          className="custom-swiper-button-prev"
          sx={{ left: -20 }}
        >
          <ChevronLeftIcon />
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
          loop
        >
          {articles?.map((article, index) => (
            <SwiperSlide key={article._id}>
              <BlogSlideshowArticle article={article} />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton
          className="custom-swiper-button-next"
          sx={{ right: -20 }}
        >
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
    </BlogSlideshowRoot>
  )
}