import { motion } from 'framer-motion';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies?: Movie[];
  isLoading: boolean;
  title?: string;
  skeletonCount?: number;
}

export function MovieGrid({ movies, isLoading, title, skeletonCount = 15 }: MovieGridProps) {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-10 px-[140px] pb-20" style={{ paddingTop: '0px' }}>
        {title && (
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white font-black text-3xl tracking-tight"
          >
            {title}
          </motion.h2>
        )}

        {isLoading ? (
          <div className="grid grid-cols-5 gap-5">
            {Array.from({ length: skeletonCount }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : !movies?.length ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-600">
            <span className="text-5xl mb-4">🎬</span>
            <p className="text-lg font-medium text-white/40">No movies found</p>
            <p className="text-sm mt-1 text-white/30">Try other keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-5">
            {movies.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
