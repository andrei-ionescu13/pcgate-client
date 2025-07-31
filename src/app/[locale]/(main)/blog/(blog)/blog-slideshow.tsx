'use client';

import { IconButton } from '@/components/icon-button';
import { ChevronLeft as ChevronLeftIcon } from '@/icons/chevron-left';
import { ChevronRight as ChevronRightIcon } from '@/icons/chevron-right';
import type { Article } from '@/types/articles';
import { FC, useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BlogSlideshowArticle } from './blog-slideshow-article';
import './blog-slideshow.scss';

interface BlogSlideshowProps {
  articles: Article[];
}

export const BlogSlideshow: FC<BlogSlideshowProps> = (props) => {
  const { articles } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="pb-5">
        <BlogSlideshowArticle article={articles[0]} />
      </div>
    );
  }

  return (
    <div className="articles-slideshow">
      <div className="relative">
        <IconButton className="articles-slideshow-button-prev -left-5">
          <ChevronLeftIcon />
        </IconButton>
        <IconButton className="articles-slideshow-button-next -right-5">
          <ChevronRightIcon />
        </IconButton>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: '.articles-slideshow-button-next',
            prevEl: '.articles-slideshow-button-prev',
          }}
          pagination={{
            el: '.articles-slideshow-pagination',
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
      <div className="articles-slideshow-pagination mt-3 flex justify-center" />
    </div>
  );
};
