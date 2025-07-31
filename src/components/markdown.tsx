'use client';
import type { FC } from 'react';

interface MarkdownProps {
  content: string;
}

export const Markdown: FC<MarkdownProps> = (props) => {
  const { content } = props;

  return (
    <div
      className="body2 [&>p]:mb-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
