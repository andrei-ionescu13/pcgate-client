"use client"
import type { FC } from 'react';
import { NEXT_PUBLIC_FACEBOOK_APP_ID } from '@/constants';
import { Box } from '@mui/material';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share';

interface ShareProps {
  url: string;
  size?: number;
  borderRadius?: number;
}

export const Share: FC<ShareProps> = (props) => {
  const { url, size = 32, borderRadius = 16 } = props;
  const iconProps = { size, borderRadius }

  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gap: 0.5,
        justifyContent: 'start'
      }}
    >
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
    </Box>
  )
}