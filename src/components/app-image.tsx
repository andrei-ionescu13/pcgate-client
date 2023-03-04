import type { FC } from 'react';
import Image from 'next/image'
import type { ImageProps, ImageLoaderProps } from 'next/image'
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Delivery } from '@cloudinary/url-gen/actions';
import { sharpen } from '@cloudinary/url-gen/actions/adjust';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'desubtoqp'
  }
});

const myLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  let image = cld.image(src).resize(fill().width(width))

  if (quality) {
    image = image.delivery(Delivery.quality(quality));
  }

  return image.toURL()
}

export const AppImage: FC<ImageProps> = (props) => {

  return (
    <Image
      loader={myLoader}
      quality={75}
      {...props}
    />
  )
}