import { Article, ArticleCategory, ArticleTag } from '@/types/articles';
import { appFetchAuth } from '@/utils/app-fetch';
import { ParsedUrlQuery } from 'querystring';

interface GetArticlesData {
  articles: Article[];
  count: number;
}

export const getArticles = (query: ParsedUrlQuery) =>
  appFetchAuth<GetArticlesData>({
    url: '/articles',
    query,
  });

export const listCategories = () =>
  appFetchAuth<ArticleCategory[]>({
    url: '/article-categories',
  });

export const listTags = () =>
  appFetchAuth<ArticleTag[]>({
    url: '/article-tags',
  });
