import { remark } from 'remark'
import html from 'remark-html'

export const markdownToHtml = async (markdown: string): Promise<string> => (await remark().use(html).process(markdown)).toString();