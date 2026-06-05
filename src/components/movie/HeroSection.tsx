import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrendingMovies } from '@/hooks/useMovies';
import { getImageUrl } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import { Button } from '../ui/button';
import PlayIcon from '../../assets/icons/play.png';

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
    return <div className="relative w-full bg-black h-98 lg:h-202.5 max-h-202.5" />;
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, IMAGE_SIZES.backdrop.large);

  return (
    <div className="w-full h-98 mx-auto lg:h-202.5 max-h-202.5">
      {/* Background image */}
      <AnimatePresence mode="sync">
        <motion.div
          key={movie.id}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={backdropUrl}
            alt={movie.title}
            className="w-3/2 h-3/2 object-contain object-top mx-auto"
          />
          {/* Gradient overlays */}
          <div className="absolute -bottom-202.5 inset-0 bg-linear-to-t from-black via-black to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="w-90.25 md:w-120 lg:w-158.75 md:ml-4 lg:ml-0 mt-55.75 md:mt-65 lg:mt-74.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3xl md:gap-5xl lg:gap-6xl"
          >
            {/* Title */}
            <div className="flex flex-col gap-sm md:gap-lg lg:gap-xl w-full z-20">
              <h1 className="text-neutral-25 font-bold text-size-display-xs md:text-size-display-md lg:text-size-display-2xl">
                {movie.title}
              </h1>
              <p className="text-neutral-400 text-size-sm md:text-size-md line-clamp-5">
                {movie.overview}
              </p>
            </div>

            {/* Buttons - Frame 6 */}
            <div className="flex flex-col md:flex-row gap-xl">
              {/* Button Primary - Watch Trailer */}
              <Button
                type="button"
                variant={'default'}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="w-full md:w-57.5 z-20"
              >
                Watch Trailer <img src={PlayIcon} alt="" className="w-6 h-6" />
              </Button>

              {/* Button Secondary - See Detail */}
              <Button
                type="button"
                variant={'secondary'}
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="w-full md:w-57.5 z-20"
              >
                See Detail
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
