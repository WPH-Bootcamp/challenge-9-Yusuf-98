import { useEffect, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { searchSchema, type SearchFormValues } from '@/lib/schemas';
import type { Movie } from '@/types/movie';
import { Toast } from '../components/ui/Toast';
import { SearchSkeleton } from '@/components/ui/SearchSkeleton';
import SearchResultItem from '@/components/movie/SearchResult';
import { NotFoundState } from '@/components/movie/NotFoundState';
import { InitState } from '@/components/movie/InitState';
import { TrailerModalFromId } from '@/components/movie/TrailerModalFromID';
import { useSearchMovies } from '@/hooks/useMovies';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q')?.trim() ?? '';

  // Only set while user is typing ahead of the debounce.
  // null means "no pending input — use the URL value".
  const [pendingInput, setPendingInput] = useState<string | null>(null);

  // The displayed input value: prefer what the user is typing,
  // fall back to the committed URL value. No effect needed.
  const inputValue = pendingInput ?? queryFromUrl;

  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const {
    setValue,
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: queryFromUrl },
  });

  const { data, isLoading } = useSearchMovies(queryFromUrl);
  const results = data?.results ?? [];

  // Debounce: commit pending input to the URL, then clear the pending state.
  useEffect(() => {
    if (pendingInput === null) return;

    const timer = setTimeout(() => {
      const q = pendingInput.trim();
      setSearchParams(q.length >= 2 ? { q } : {});
      setPendingInput(null); // URL has caught up — stop overriding
    }, 400);

    return () => clearTimeout(timer);
  }, [pendingInput, setSearchParams]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setPendingInput(val);
      setValue('query', val, { shouldValidate: true });
    },
    [setValue]
  );

  const closeToast = useCallback(() => {
    setToast((p) => ({ ...p, visible: false }));
  }, []);

  const hasQuery = queryFromUrl.length >= 2;
  const notFound = hasQuery && !isLoading && results.length === 0;
  const found = hasQuery && !isLoading && results.length > 0;

  return (
    <div className="bg-base-black min-h-screen flex flex-col">
      <Toast message={toast.message} visible={toast.visible} onClose={closeToast} />

      {/* Wire to your actual search input */}
      <input value={inputValue} onChange={handleInputChange} />

      <div className="flex-1 px-xl md:px-11xl pt-32.5">
        <AnimatePresence mode="wait">
          {isLoading && hasQuery ? (
            <SearchSkeleton key="skeleton" />
          ) : found ? (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {results.map((movie, i) => (
                <div key={movie.id}>
                  <SearchResultItem
                    movie={movie}
                    index={i}
                    onWatchTrailer={(m: Movie) => setTrailerMovie(m)}
                  />
                  {i !== results.length - 1 && (
                    <div className="w-full h-px bg-neutral-800 my-6xl" />
                  )}
                </div>
              ))}
            </motion.div>
          ) : notFound ? (
            <NotFoundState key="notfound" />
          ) : (
            <InitState key="init" />
          )}
        </AnimatePresence>

        {errors.query && (
          <p className="text-primary-200 text-size-xs mt-md">{errors.query.message}</p>
        )}
      </div>

      {trailerMovie && (
        <TrailerModalFromId movie={trailerMovie} onClose={() => setTrailerMovie(null)} />
      )}
    </div>
  );
}
