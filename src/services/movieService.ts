import api from '@/lib/axios';
import type { MovieResponse, MovieDetails } from '@/types/movie';

// TODO: Create service functions to fetch data from TMDB API
// Reference: https://developer.themoviedb.org/reference/intro/getting-started

export const movieService = {
  // TODO: Implement getPopularMovies function
  // Endpoint: GET /movie/popular
  // TODO: Implement getNowPlayingMovies function
  // Endpoint: GET /movie/now_playing
  // TODO: Implement getMovieDetails function
  // Endpoint: GET /movie/{movie_id}
  // TODO: Implement searchMovies function
  // Endpoint: GET /search/movie
  // TODO: Add more endpoints as needed
  getPopularMovies: async (page: number = 1): Promise<MovieResponse> => {
    const { data } = await api.get<MovieResponse>('/movie/popular', { params: { page } });
    return data;
  },

  getNowPlayingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const { data } = await api.get<MovieResponse>('/movie/now_playing', { params: { page } });
    return data;
  },

  getTrendingMovies: async (page: number = 1): Promise<MovieResponse> => {
    const { data } = await api.get<MovieResponse>('/trending/movie/week', { params: { page } });
    return data;
  },

  getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
    const { data } = await api.get<MovieDetails>(`/movie/${movieId}`, {
      params: { append_to_response: 'credits,videos,similar' },
    });
    return data;
  },

  searchMovies: async (query: string, page: number = 1): Promise<MovieResponse> => {
    const { data } = await api.get<MovieResponse>('/search/movie', {
      params: { query, page },
    });
    return data;
  },
};
