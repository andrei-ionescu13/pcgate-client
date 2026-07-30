'use client';

import { Tooltip } from '@mui/material';
import { CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { IconButton } from './icon-button';

interface CopyTextButtonProps {
  text: string;
  disabled?: boolean;
}

export const CopyTextButton = ({
  text,
  disabled = false,
}: CopyTextButtonProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
  };

  return (
    <Tooltip
      title={hasCopied ? 'Copied' : 'Copy'}
      placement="top"
      slotProps={{
        transition: {
          onExited: () => {
            setHasCopied(false);
          },
        },
      }}
    >
      <IconButton
        size="small"
        onClick={handleCopyToClipboard}
        disabled={disabled}
      >
        <CopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};
