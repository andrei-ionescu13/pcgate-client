'use client';

import { ContentCopyOutlined as ContentCopyIcon } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useState, type FC } from 'react';

interface CopyTextButtonProps {
  text: string;
  disabled?: boolean;
}

export const CopyTextButton: FC<CopyTextButtonProps> = (props) => {
  const { text, disabled = false } = props;
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
  };

  return (
    <Tooltip
      title={hasCopied ? 'Copied' : 'Copy'}
      placement="top"
      TransitionProps={{
        onExited: () => {
          setHasCopied(false);
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleCopyToClipboard}
        disabled={disabled}
      >
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
