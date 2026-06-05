import { motion } from 'framer-motion';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import { useNavigate } from 'react-router-dom';
import type { SearchResultItemProps } from '@/types/movie';
import PlayIcon from '../../assets/icons/play.png';
import StarIcon from '../../assets/icons/star-yellow.png';
import { Button } from '../ui/button';
import FavoriteIcon from '../ui/FavoriteIcon';

export default function SearchResultItem({ movie, index, onWatchTrailer }: SearchResultItemProps) {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovieStore();
  const fav = isFavorite(movie.id);
  const posterUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative w-full bg-neutral-900 rounded-2xl p-xl md:p-3xl"
    >
      {/* Favorite button — desktop only, pojok kanan atas */}
      <div className="hidden md:block absolute top-xl right-xl z-10">
        <Button variant="favorite" isFavorite={fav} onClick={() => toggleFavorite(movie)}>
          <FavoriteIcon isFavorite={fav} />
        </Button>
      </div>

      {/* Row: poster + info */}
      <div className="flex flex-row gap-xl mb-xl md:pr-14">
        {/* Poster */}
        <div
          onClick={() => navigate(`/movie/${movie.id}`)}
          className="shrink-0 aspect-2/3 rounded-lg overflow-hidden bg-neutral-800 cursor-pointer w-23 md:w-33"
        >
          {movie.poster_path ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover block"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-600 text-3xl">
              🎬
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-xs">
          {/* Title */}
          <h3
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="m-0 text-neutral-25 font-bold text-size-md md:text-size-display-xs leading-snug cursor-pointer line-clamp-2"
          >
            {movie.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-xs">
            <img src={StarIcon} alt="" aria-hidden="true" className="w-5 h-5" />
            <span className="text-neutral-25 font-medium text-size-xs md:text-size-sm">
              {movie.vote_average.toFixed(1)}/10
            </span>
          </div>

          {/* Overview */}
          <p className="m-0 text-neutral-400 text-size-xs md:text-size-sm leading-relaxed line-clamp-2">
            {movie.overview || 'No overview available.'}
          </p>
        </div>
      </div>

      {/* Bottom: Watch Trailer + Favorite mobile */}
      <div className="flex flex-row items-center gap-lg">
        <Button
          type="button"
          variant="default"
          onClick={() => onWatchTrailer(movie)}
          className="flex-1 md:flex-none md:w-50"
        >
          Watch Trailer
          <img src={PlayIcon} alt="" aria-hidden="true" className="w-6 h-6" />
        </Button>

        {/* Favorite — mobil only */}
        <div className="flex md:hidden">
          <Button variant="favorite" isFavorite={fav} onClick={() => toggleFavorite(movie)}>
            <FavoriteIcon isFavorite={fav} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
