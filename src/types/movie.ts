// TODO: Define TypeScript interfaces for Movie data
// Hint: Check TMDB API documentation for the movie object structure
// https://developer.themoviedb.org/reference/movie-details

export interface Movie {
  // TODO: Add movie properties based on TMDB API response
  // Examples: id, title, overview, poster_path, etc.
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieResponse {
  // TODO: Add pagination properties
  // Examples: page, results, total_pages, total_results
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

// TODO: Add more types as needed (Genre, Video, etc.)
export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  production_companies: ProductionCompany[];
  credits: Credits;
  videos: VideoResponse;
  similar: MovieResponse;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  cast_id: number;
  credit_id: string;
  known_for_department: string;
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
  credit_id: string;
}

export interface Credits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  id: number;
  results: Video[];
}
