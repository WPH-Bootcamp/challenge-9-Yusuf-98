import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import { QUERY_KEYS } from '@/lib/constants';

// TODO: Create custom hooks using React Query
// Reference: https://tanstack.com/query/latest/docs/framework/react/overview

// Example: Hook to fetch popular movies
export const usePopularMovies = (page: number = 1) => {
  // TODO: Implement useQuery hook
  // Hint: Use movieService.getPopularMovies as queryFn
  return useQuery({
    queryKey: QUERY_KEYS.movies.popular(page),
    queryFn: () => movieService.getPopularMovies(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

// TODO: Add more hooks for different endpoints
// Examples: useMovieDetails, useSearchMovies, useNowPlayingMovies
export const useNowPlayingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.nowPlaying(page),
    queryFn: () => movieService.getNowPlayingMovies(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useTrendingMovies = (page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.trending(page),
    queryFn: () => movieService.getTrendingMovies(page),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.details(movieId),
    queryFn: () => movieService.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useSearchMovies = (query: string, page: number = 1) => {
  return useQuery({
    queryKey: QUERY_KEYS.movies.search(query, page),
    queryFn: () => movieService.searchMovies(query, page),
    enabled: query.trim().length > 1,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: (prev) => prev,
  });
};

export const useInfiniteNowPlaying = () => {
  return useInfiniteQuery({
    queryKey: ['movies', 'now-playing', 'infinite'],
    queryFn: ({ pageParam = 1 }) => movieService.getNowPlayingMovies(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};
