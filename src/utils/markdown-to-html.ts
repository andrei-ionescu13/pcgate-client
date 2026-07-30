import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

export async function markdownToHtml(markdown: string) {
  const parsed = await marked.parse(markdown);

  return sanitizeHtml(parsed, {
    allowedTags: sanitizeHtml.defaults.allowedTags,
    allowedAttributes: sanitizeHtml.defaults.allowedAttributes,
  });
}
