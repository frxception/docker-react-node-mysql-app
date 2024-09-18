import { QueryKey, UseQueryOptions } from '@tanstack/react-query';

export type PageParams = {
  page?: number;
  limit?: number;
};

export type QueryOptions<T, TQueryData = unknown, TError = unknown> = Omit<
  UseQueryOptions<TQueryData, TError, T, QueryKey>,
  | 'queryKey'
  | 'queryFn'
  | 'refetchInterval'
  | 'refetchOnMount'
  | 'refetchOnReconnect'
  | 'refetchOnWindowFocus'
  | 'useErrorBoundary'
>;
