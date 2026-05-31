import { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { useMovieStore } from '@/store/movieStore';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();
  const { favorites } = useMovieStore();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      clearTimeout(timerRef.current);
      if (val.trim().length > 1) {
        timerRef.current = setTimeout(() => {
          navigate(`/search?q=${encodeURIComponent(val.trim())}`);
        }, 400);
      }
    },
    [navigate]
  );

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 1) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div
        className="w-full flex flex-row justify-between items-center px-35 py-5 gap-4"
        style={{ height: '90px' }}
      >
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <rect x="2" y="3" width="20" height="14" rx="2" fill="white" />
              <rect x="8" y="17" width="8" height="2" fill="white" />
              <rect x="6" y="19" width="12" height="2" fill="white" />
            </svg>
            <span className="text-white font-bold text-xl tracking-wide">Movie</span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-end flex-row gap-20">
            <Link
              to="/"
              className="text-white text-base font-normal hover:text-white/80 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="relative text-white text-base font-normal hover:text-white/80 transition-colors flex items-center gap-1"
            >
              Favorites
              {favorites.length > 0 && (
                <span className="ml-1 w-4 h-4 bg-[#961200] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Right: Search */}
        <form onSubmit={handleSubmit} className="relative">
          <div
            className={cn(
              'flex flex-row items-center gap-2 px-4 py-2 rounded-2xl',
              'border transition-all duration-200',
              focused
                ? 'border-white/30 bg-[rgba(10,13,18,0.8)]'
                : 'border-[#252B37] bg-[rgba(10,13,18,0.6)]'
            )}
            style={{
              width: '243px',
              height: '56px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Search size={16} className="text-white/50 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Search Movie"
              className="flex-1 bg-transparent text-white text-sm placeholder:text-white/40 outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </form>
      </div>
    </header>
  );
}
