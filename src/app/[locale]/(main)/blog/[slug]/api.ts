import { Article } from '@/types/articles';
import { appFetchAuth } from '@/utils/app-fetch';

export const getArticle = (slug: string) =>
  appFetchAuth<{ article: Article }>({
    url: `/articles/${slug}`,
    withAuth: true,
  });
