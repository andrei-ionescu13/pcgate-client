import { Article } from '@/types/articles';
import { appFetch } from '@/utils/app-fetch';

export const getArticle = (slug: string) =>
  appFetch<{ article: Article }>({
    url: `/articles/${slug}`,
    withAuth: true,
  });
