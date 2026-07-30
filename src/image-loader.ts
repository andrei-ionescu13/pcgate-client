'use client';

import type { ImageLoaderProps } from 'next/image';

const normalizeSrc = (src: string) => src.replace(/^\//, '');

const imageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const cloudName = 'desubtoqp';
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${normalizeSrc(src)}`;
};

export default imageLoader;
