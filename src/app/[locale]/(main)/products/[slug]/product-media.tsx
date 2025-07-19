'use client';

import { AppImage } from '@/components/app-image';
import { Youtube as YoutubeIcon } from '@/icons/youtube';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const extractVideoID = (url: string): string => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7]) || '';
};

export type ProductMediaSlideVideo = {
  type: 'video';
  url: string;
};

export type ProductMediaSlideImage = {
  type: 'image';
  public_id: string;
};

export type ProductMediaSlide = ProductMediaSlideVideo | ProductMediaSlideImage;

interface ProductMediaProps {
  slides: ProductMediaSlide[];
}

export const ProductMedia: FC<ProductMediaProps> = (props) => {
  const { slides } = props;
  const theme = useTheme();
  const breakpoints = theme.breakpoints.values;
  const [selectedSlide, setSelectedSlide] = useState<ProductMediaSlide>(
    slides[0]
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const changeSelectedSlide = (slideIndex: number): void => {
    setSelectedSlide(slides[slideIndex]);
  };

  return (
    <div>
      <div className="mb-4">
        {selectedSlide.type === 'video' ? (
          <div className="relative h-0 pb-[56.25%]">
            <iframe
              className="absolute bottom-0 top-0 h-full w-full"
              frameBorder="0"
              height="426"
              src={`https://www.youtube.com/embed/${extractVideoID(selectedSlide.url)}/`}
              width="757"
            ></iframe>
          </div>
        ) : (
          <div className="relative flex aspect-video">
            <AppImage
              alt=""
              src={selectedSlide.public_id}
              fill
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        )}
      </div>
      {isMounted ? (
        <Box
          sx={{
            minWidth: 0,
            '& .swiper-button-next, & .swiper-button-prev': {
              color: '#fff',
              width: 'auto',
              height: 'auto',
              fontSize: 8,
            },
          }}
        >
          <Swiper
            modules={[Pagination, Navigation]}
            breakpoints={{
              [breakpoints.md]: {
                slidesPerView: 5,
                slidesPerGroup: 5,
              },
              [breakpoints.sm]: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
              [breakpoints.xs]: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
            }}
            navigation={true}
          >
            {slides?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => changeSelectedSlide(index)}
                  className="cursor-pointer"
                >
                  {slide.type === 'video' ? (
                    <div className="relative flex">
                      <Image
                        alt=""
                        height={9}
                        src={`http://img.youtube.com/vi/${extractVideoID(slide.url)}/mqdefault.jpg`}
                        width={16}
                        layout="responsive"
                      />
                      <div className="absolute inset-0 grid place-items-center">
                        <YoutubeIcon fontSize="large" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex aspect-video">
                      <AppImage
                        priority
                        src={slide.public_id}
                        alt={''}
                        fill
                      />
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
          <div className="relative aspect-video" />
        </div>
      )}
    </div>
  );
};
