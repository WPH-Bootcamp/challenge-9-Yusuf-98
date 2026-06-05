import { useState, useCallback } from 'react';
import { useMovieStore } from '@/store/movieStore';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie } from '@/types/movie';
import { Toast } from '@/components/ui/Toast';
import { EmptyFavorites } from '@/components/movie/EmptyFavorites';
import FavoriteItem from '@/components/movie/FavoriteItemCard';
import { TrailerModalFromId } from '@/components/movie/TrailerModalFromID';

export function FavoritesPage() {
  const { favorites, toggleFavorite } = useMovieStore();
  const [toast, setToast] = useState({ visible: false, message: '' });
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);

  const handleRemove = useCallback(
    (movie: Movie) => {
      toggleFavorite(movie);
      setToast({ visible: true, message: 'Removed from Favorites' });
    },
    [toggleFavorite]
  );

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col pb-xl gap-4xl md:p-0">
      {/* Toast */}
      <Toast message={toast.message} visible={toast.visible} onClose={closeToast} />

      {/* Main content */}
      <div className="flex-1">
        {/* Desktop padding */}
        <div className="custom-container flex flex-col mt-22 md:mt-38.5">
          <motion.h1
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-neutral-25 font-bold text-size-display-xs md:text-size-display-lg mb-6xl"
          >
            Favorites
          </motion.h1>

          {favorites.length === 0 ? (
            <EmptyFavorites />
          ) : (
            <>
              <AnimatePresence mode="popLayout">
                {favorites.map((movie, i) => (
                  <div key={movie.id}>
                    <FavoriteItem
                      movie={movie}
                      isFavorite={true}
                      index={i}
                      onRemove={handleRemove}
                      onWatchTrailer={(m) => setTrailerMovie(m)}
                    />

                    {/* Divider hanya muncul jika BUKAN item terakhir */}
                    {i !== favorites.length - 1 && (
                      <div className="w-full h-px bg-neutral-800 my-6xl" />
                    )}
                  </div>
                ))}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>

      {/* Trailer Modal — fetch detail untuk dapat videos */}
      {trailerMovie && (
        <TrailerModalFromId movie={trailerMovie} onClose={() => setTrailerMovie(null)} />
      )}
    </div>
  );
}
