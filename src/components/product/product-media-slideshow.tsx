import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useState } from 'react';
import type { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Youtube as YoutubeIcon } from '../../icons/youtube';

SwiperCore.use([Pagination, Navigation]);

const extractVideoID = (url: string): string => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7]) || '';
};

interface Slide {
  slug: string;
  type: 'video' | 'image';
  url: string;
}

interface ProductMediaSlideshowProps {
  slides: Slide[];
}

export const ProductMediaSlideshow: FC<ProductMediaSlideshowProps> = (props) => {
  const { slides } = props;
  const theme = useTheme();
  const breakpoints = theme.breakpoints.values;
  const [selectedSlide, setSelectedSlide] = useState<Slide>(slides[0]);

  const changeSelectedSlide = (slideIndex: number): void => {
    setSelectedSlide(slides[slideIndex]);
  };

  return (
    <Box
      sx={{
        '& img': {
          display: 'block',
          maxWidth: '100%',
          minHeight: '56.28318584070796%'
        }
      }}
    >
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
          <img
            alt=""
            src={`https://fanatical.imgix.net/product/original/${selectedSlide.slug}?auto=compress,format&w=350&fit=crop&h=197`}
          />
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
                    <img
                      alt=""
                      src={`http://img.youtube.com/vi/${extractVideoID(slide.url)}/mqdefault.jpg`}
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
                  <img
                    alt=""
                    src={`https://fanatical.imgix.net/product/original/${slide.slug}?auto=compress,format&w=350&fit=crop&h=197`}
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
