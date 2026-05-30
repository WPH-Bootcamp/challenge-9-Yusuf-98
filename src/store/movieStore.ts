import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '@/lib/constants';
import type { Movie } from '@/types/movie';

// TODO: Define your store state interface
interface MovieStore {
  // TODO: Add state properties
  // Examples: favorites, watchlist, selectedMovie, etc.
  // TODO: Add action methods
  // Examples: addToFavorites, removeFromFavorites, etc.
  favorites: Movie[];
  watchlist: Movie[];

  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;

  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatchlist: (movie: Movie) => void;
  isInWatchlist: (movieId: number) => boolean;
}

// TODO: Create Zustand store
// Reference: https://zustand.docs.pmnd.rs/getting-started/introduction

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],

      addToFavorites: (movie) =>
        set((state) => {
          if (state.favorites.some((m) => m.id === movie.id)) return state;
          return { favorites: [...state.favorites, movie] };
        }),

      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),

      toggleFavorite: (movie) => {
        const { isFavorite, addToFavorites, removeFromFavorites } = get();
        isFavorite(movie.id) ? removeFromFavorites(movie.id) : addToFavorites(movie);
      },

      isFavorite: (movieId) => get().favorites.some((m) => m.id === movieId),

      addToWatchlist: (movie) =>
        set((state) => {
          if (state.watchlist.some((m) => m.id === movie.id)) return state;
          return { watchlist: [...state.watchlist, movie] };
        }),

      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        })),

      toggleWatchlist: (movie) => {
        const { isInWatchlist, addToWatchlist, removeFromWatchlist } = get();
        isInWatchlist(movie.id) ? removeFromWatchlist(movie.id) : addToWatchlist(movie);
      },

      isInWatchlist: (movieId) => get().watchlist.some((m) => m.id === movieId),
    }),
    {
      name: STORAGE_KEYS.favorites,
      partialize: (state) => ({
        favorites: state.favorites,
        watchlist: state.watchlist,
      }),
    }
  )
);
