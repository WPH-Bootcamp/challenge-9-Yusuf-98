import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl } from '@/lib/utils';
import { IMAGE_SIZES } from '@/lib/constants';
import type { Movie } from '@/types/movie';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  index?: number;
  showRank?: boolean;
  rank?: number;
}

export function MovieCard({ movie, index = 0, showRank = false, rank }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useMovieStore();
  const fav = isFavorite(movie.id);
  const posterUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.poster.medium);
  const year = movie.release_date?.slice(0, 4) ?? '—';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
      className="group relative flex-shrink-0"
    >
      <Link to={`/movie/${movie.id}`} className="block">
        {/* Poster */}
        <div
          className="relative overflow-hidden bg-neutral-800"
          style={{ borderRadius: '8px', aspectRatio: '2/3' }}
        >
          {movie.poster_path ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-600">
              <span className="text-4xl">🎬</span>
            </div>
          )}

          {/* Rank badge for trending */}
          {showRank && rank !== undefined && (
            <div
              className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
            >
              {rank}
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white text-xs line-clamp-4 leading-relaxed">
              {movie.overview || 'No synopsis available.'}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-2">
          <p className="text-white text-sm font-semibold line-clamp-1 leading-snug">
            {movie.title}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white/50 text-xs">{year} · </span>
            <span className="text-white/70 text-xs">{movie.vote_average.toFixed(1)}/10</span>
          </div>
        </div>
      </Link>

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className={cn(
          'absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-all duration-200',
          'opacity-0 group-hover:opacity-100',
          fav ? 'bg-[#961200] opacity-100' : 'bg-black/60 hover:bg-[#961200]'
        )}
        title={fav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          size={14}
          className={cn('transition-colors', fav ? 'fill-white text-white' : 'text-white')}
        />
      </button>
    </motion.div>
  );
}
