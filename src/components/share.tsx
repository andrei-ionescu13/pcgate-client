'use client';

import { NEXT_PUBLIC_FACEBOOK_APP_ID } from '@/constants';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  XShareButton,
} from 'react-share';

interface ShareProps {
  url: string;
  size?: number;
  borderRadius?: number;
}

export const Share = ({ url, size = 32, borderRadius = 16 }: ShareProps) => {
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
      <XShareButton url={url}>
        <XIcon {...iconProps} />
      </XShareButton>
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
