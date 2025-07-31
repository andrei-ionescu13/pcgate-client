'use client';
import { NEXT_PUBLIC_FACEBOOK_APP_ID } from '@/constants';
import type { FC } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

interface ShareProps {
  url: string;
  size?: number;
  borderRadius?: number;
}

export const Share: FC<ShareProps> = (props) => {
  const { url, size = 32, borderRadius = 16 } = props;
  const iconProps = { size, borderRadius };

  return (
    <div className="grid grid-flow-col justify-start gap-1">
      <FacebookShareButton url={url}>
        <FacebookIcon {...iconProps} />
      </FacebookShareButton>
      {NEXT_PUBLIC_FACEBOOK_APP_ID && (
        <FacebookMessengerShareButton
          url={url}
          appId={NEXT_PUBLIC_FACEBOOK_APP_ID}
        >
          <FacebookMessengerIcon {...iconProps} />
        </FacebookMessengerShareButton>
      )}
      <TwitterShareButton url={url}>
        <TwitterIcon {...iconProps} />
      </TwitterShareButton>
      <EmailShareButton url={url}>
        <EmailIcon {...iconProps} />
      </EmailShareButton>
      <RedditShareButton url={url}>
        <RedditIcon {...iconProps} />
      </RedditShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon {...iconProps} />
      </WhatsappShareButton>
    </div>
  );
};
