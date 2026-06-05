import type { Movie } from '@/types/movie';
import { useMovieDetails } from '@/hooks/useMovies';
import { TrailerModal } from '@/components/movie/TrailerModal';

export function TrailerModalFromId({ movie, onClose }: { movie: Movie; onClose: () => void }) {
  const { data } = useMovieDetails(movie.id);
  return (
    <TrailerModal
      videos={data?.videos?.results ?? []}
      visible={true}
      onClose={onClose}
      movieTitle={movie.title}
    />
  );
}
