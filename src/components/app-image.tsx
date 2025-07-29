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

//click checkout
//check inventory for keys
//empty the card
//change status for those key locked/pending whatever
//return checkout page
//complete the checkout

//use webhooks to check when the payment is done and send the keys to the user
//if checkout session expires change status to those keys back to locked

//on checkout send user to a page with loading and fetch the session (polling) to
//get the session and find the order by stripe id session
