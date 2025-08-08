'use client';
import { Cloudinary } from '@cloudinary/url-gen';
import { Delivery } from '@cloudinary/url-gen/actions';
import { fill } from '@cloudinary/url-gen/actions/resize';
import type { ImageLoaderProps, ImageProps } from 'next/image';
import Image from 'next/image';
import type { FC } from 'react';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'desubtoqp',
  },
});

const myLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  let image = cld.image(src).resize(fill().width(width));

  if (quality) {
    image = image.delivery(Delivery.quality(quality));
  }

  return image.toURL();
};

interface AppImageProps extends ImageProps {
  alt: string;
}

export const AppImage: FC<AppImageProps> = (props) => {
  return (
    <Image
      loader={myLoader}
      {...props}
    />
  );
};
