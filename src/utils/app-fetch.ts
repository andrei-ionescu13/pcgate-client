import { ApiError } from './api-error';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
};

export const appFetch = async (url: string, config: any = {}) => {
  const { headers, ...restConfig } = config;

  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}${url}`, {
    headers: {
      ...DEFAULT_HEADERS,
      ...headers
    },
    ...restConfig
  });

  const data = await response.json();

  if (response.ok) {
    return data;
  }

  throw new ApiError(response.status, data.message);
};
