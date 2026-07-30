import DOMPurify from 'isomorphic-dompurify';
import { marked } from 'marked';

export const markdownToHtml = async (markdown: string) => {
  const parsed = await marked.parse(markdown);
  return DOMPurify.sanitize(parsed, {
    USE_PROFILES: { html: true },
  });
};
