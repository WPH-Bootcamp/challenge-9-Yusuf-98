import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrendingMovies } from '@/hooks/useMovies';
import { getImageUrl } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';

export function HeroSection() {
  const { data } = useTrendingMovies();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  const movies = data?.results?.slice(0, 5) ?? [];
  const movie = movies[current];

  // Auto-rotate hero
  useEffect(() => {
    if (movies.length < 2) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % movies.length);
    }, 6000);
    return () => clearInterval(id);
  }, [movies.length]);

  if (!movie) {
    return <div className="relative w-full bg-black" style={{ height: '810px' }} />;
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: '810px' }}>
      {/* Background image with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={movie.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover object-top"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content - Frame 8: left: 140px, top: 298px */}
      <div className="absolute" style={{ left: '140px', top: '298px', width: '635px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-12"
          >
            {/* Title */}
            <div className="flex flex-col gap-3">
              <h1 className="text-white font-black text-[56px] leading-none tracking-tight">
                {movie.title}
              </h1>
              <p className="text-white/70 text-base leading-relaxed line-clamp-3">
                {movie.overview}
              </p>
            </div>

            {/* Buttons - Frame 6 */}
            <div className="flex flex-row items-end gap-20">
              {/* Button Primary - Watch Trailer */}
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex flex-row justify-center items-center gap-2 text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{
                  width: '230px',
                  height: '52px',
                  background: '#961200',
                  borderRadius: '9999px',
                  padding: '8px',
                }}
              >
                Watch Trailer
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <Play size={10} fill="#961200" className="text-[#961200] ml-0.5" />
                </span>
              </button>

              {/* Button Secondary - See Detail */}
              <button
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex flex-row justify-center items-center gap-2 text-white font-semibold text-sm transition-opacity hover:opacity-90"
                style={{
                  width: '230px',
                  height: '52px',
                  background: 'rgba(10, 13, 18, 0.6)',
                  border: '1px solid #181D27',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '9999px',
                  padding: '8px',
                }}
              >
                See Detail
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      {movies.length > 1 && (
        <div className="absolute bottom-12 left-35 flex gap-2">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? '24px' : '8px',
                height: '4px',
                borderRadius: '9999px',
                background: i === current ? 'white' : 'rgba(255,255,255,0.3)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
