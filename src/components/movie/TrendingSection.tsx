import { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTrendingMovies } from '@/hooks/useMovies';
import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

export function TrendingSection() {
  const { data, isLoading } = useTrendingMovies();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-col gap-10 px-[140px] pb-20" style={{ paddingTop: '0px' }}>
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-white font-black text-3xl tracking-tight"
        >
          Trending Now
        </motion.h2>

        <div className="relative">
          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex flex-row gap-5 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0" style={{ width: '200px' }}>
                    <MovieCardSkeleton />
                  </div>
                ))
              : data?.results.slice(0, 10).map((movie, i) => (
                  <div
                    key={movie.id}
                    className="flex-shrink-0"
                    style={{ width: '200px', scrollSnapAlign: 'start' }}
                  >
                    <MovieCard movie={movie} index={i} showRank={true} rank={i + 1} />
                  </div>
                ))}
          </div>

          {/* Arrow button */}
          <button
            onClick={scroll}
            className="absolute -right-5 top-1/3 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
