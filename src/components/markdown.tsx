interface MarkdownProps {
  content: string;
}

export const Markdown = ({ content }: MarkdownProps) => {
  return (
    <div
      className="body2 [&>p]:mb-8"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
