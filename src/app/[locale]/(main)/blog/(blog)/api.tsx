import { Article, ArticleCategory, ArticleTag } from '@/types/articles';
import { appFetch } from '@/utils/app-fetch';
import { ParsedUrlQuery } from 'querystring';

interface GetArticlesData {
  articles: Article[];
  count: number;
}

export const getArticles = (query: ParsedUrlQuery) =>
  appFetch<GetArticlesData>({
    url: '/articles',
    query,
  });

export const listCategories = () =>
  appFetch<ArticleCategory[]>({
    url: '/article-categories',
  });

export const listTags = () =>
  appFetch<ArticleTag[]>({
    url: '/article-tags',
  });
