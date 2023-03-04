import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useState } from 'react';
import type { FC } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Youtube as YoutubeIcon } from '@/icons/youtube';
import { AppImage } from "@/components/app-image";

const extractVideoID = (url: string): string => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7]) || '';
};

export type ProductMediaSlideVideo = {
  type: 'video';
  url: string;
}

export type ProductMediaSlideImage = {
  type: 'image';
  public_id: string;
}

export type ProductMediaSlide = ProductMediaSlideVideo | ProductMediaSlideImage;

interface ProductMediaProps {
  slides: ProductMediaSlide[];
}

export const ProductMedia: FC<ProductMediaProps> = (props) => {
  const { slides } = props;
  const theme = useTheme();
  const breakpoints = theme.breakpoints.values;
  const [selectedSlide, setSelectedSlide] = useState<ProductMediaSlide>(slides[0]);

  const changeSelectedSlide = (slideIndex: number): void => {
    setSelectedSlide(slides[slideIndex]);
  };

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        {selectedSlide.type === 'video' ? (
          <Box
            sx={{
              position: 'relative',
              pb: '56.25%',
              height: 0,
              '& iframe': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }
            }}
          >
            <iframe
              title="trailer"
              frameBorder="0"
              height="426"
              src={`https://www.youtube.com/embed/${extractVideoID(selectedSlide.url)}/`}
              width="757"
            >
            </iframe>
          </Box>
        ) : (
          <Box sx={{ display: 'flex' }}>
            <AppImage
              alt=""
              height={540}
              src={selectedSlide.public_id}
              width={960}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          '& .swiper-button-next, & .swiper-button-prev': {
            color: '#fff',
            width: 'auto',
            height: 'auto',
            fontSize: 8
          }
        }}
      >
        <Swiper
          modules={[Pagination, Navigation]}
          breakpoints={{
            [breakpoints.md]: {
              slidesPerView: 5,
              slidesPerGroup: 5
            },
            [breakpoints.sm]: {
              slidesPerView: 4,
              slidesPerGroup: 4
            },
            [breakpoints.xs]: {
              slidesPerView: 3,
              slidesPerGroup: 3
            }
          }}
          navigation={true}
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box
                onClick={() => changeSelectedSlide(index)}
                sx={{ cursor: 'pointer' }}
              >
                {slide.type === 'video' ? (
                  <Box sx={{ position: 'relative' }}>
                    <Image
                      alt=""
                      height={9}
                      src={`http://img.youtube.com/vi/${extractVideoID(slide.url)}/mqdefault.jpg`}
                      width={16}
                      layout="responsive"
                    />
                    <Box
                      sx={{
                        color: '#fff',
                        display: 'grid',
                        height: '100%',
                        left: 0,
                        placeItems: 'center',
                        position: 'absolute',
                        top: 0,
                        width: '100%'
                      }}
                    >
                      <YoutubeIcon fontSize="large" />
                    </Box>
                  </Box>
                ) : (
                  <AppImage
                    layout="responsive"
                    width={16}
                    height={9}
                    priority
                    src={slide.public_id}
                    alt={""}
                  />
                )}
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};
