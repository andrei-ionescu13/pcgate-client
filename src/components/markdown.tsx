import type { FC } from 'react';
import { styled } from '@mui/material';

interface MarkdownProps {
  content: string;
}

const MarkdownRoot = styled('div')(({ theme }) => ({
  p: {
    fontSize: 14,
    marginBottom: theme.spacing(4)
  }
}))

export const Markdown: FC<MarkdownProps> = (props) => {
  const { content } = props;

  return <MarkdownRoot dangerouslySetInnerHTML={{ __html: content }} />
}