import { useState } from 'react';
import { HeroSection } from '@/components/movie/HeroSection';
import { TrendingSection } from '@/components/movie/TrendingSection';
import { MovieGrid } from '@/components/movie/MovieGrid';
import { Pagination } from '@/components/ui/Pagination';
import { useNowPlayingMovies } from '@/hooks/useMovies';

export function HomePage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useNowPlayingMovies(page);

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section - top: 0, height: 810px */}
      <HeroSection />

      {/* Frame 12 - Trending: top: 763px overlaps slightly with hero bottom */}
      <div style={{ marginTop: '-47px', position: 'relative', zIndex: 10 }}>
        <TrendingSection />
      </div>

      {/* Frame 10 - New Release: follows trending */}
      <div className="relative z-10">
        <MovieGrid movies={data?.results} isLoading={isLoading} title="New Release" />

        {data && (
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPageChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </div>
  );
}
