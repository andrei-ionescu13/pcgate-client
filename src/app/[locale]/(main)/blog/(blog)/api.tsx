import type { Article, ArticleCategory, ArticleTag } from '@/types/articles';
import { appFetch } from '@/utils/app-fetch';
import type { ParsedUrlQuery } from 'querystring';

interface GetArticlesData {
  articles: Article[];
  count: number;
}

export const listArticles = () =>
  appFetch<Article[]>({
    url: '/articles',
  });

export const searchArticles = (query: ParsedUrlQuery) =>
  appFetch<GetArticlesData>({
    url: '/articles/search',
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
