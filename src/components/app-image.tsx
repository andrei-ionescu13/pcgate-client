'use client';

import type { ImageLoaderProps, ImageProps } from 'next/image';
import Image from 'next/image';

const normalizeSrc = (src: string) => src.replace(/^\//, '');

const myLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const cloudName = 'desubtoqp';
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
};

interface AppImageProps extends ImageProps {
  alt: string;
}

export const AppImage = (props: AppImageProps) => {
  return (
    <Image
      loader={myLoader}
      {...props}
    />
  );
};
