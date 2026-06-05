import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '../../assets/icons/Search.png';
import ArrowBack from '../../assets/icons/arrow-back.png';
import CloseInput from '../../assets/icons/close-input.png';
import SearchInput from '../../assets/icons/search-input.png';
import { useMovieStore } from '@/store/movieStore';
import { cn } from '@/lib/utils';
import Logo from '../ui/Logo';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { navigationMenuTriggerStyle } from '../ui/navigation-menu-style';
import { Input } from '../ui/input';
import { scrollToTop } from '@/lib/scrollToTop';
import Hamburger from '../../assets/icons/hamburger-menu.png';
import CloseIcon from '../../assets/icons/x-icon.png';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const navigate = useNavigate();
  const { favorites } = useMovieStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 678) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setQuery('');
  };
  const openSearch = () => {
    setIsSearchOpen(true);
    if (isMenuOpen) closeMenu();
    setQuery('');
    setTimeout(() => inputRef.current?.focus(), 150);
  };
  const closeSearch = () => {
    setIsSearchOpen(false);
    setQuery('');
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      clearTimeout(timerRef.current);
      if (val.trim().length > 1) {
        timerRef.current = setTimeout(() => {
          navigate(`/search?q=${encodeURIComponent(val.trim())}`);
        }, 500);
      }
    },
    [navigate]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 1) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setTimeout(closeSearch, 200);
    }
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
          isScrolled ? 'backdrop-blur-2xl' : 'bg-transparent'
        )}
      >
        <AnimatePresence mode="wait">
          {isSearchOpen ? (
            /* ── MOBILE SEARCH BAR ── */
            <motion.div
              key="search-bar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="md:hidden w-full h-16 flex items-center bg-neutral-950 px-xl gap-lg"
            >
              {/* Back arrow */}
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Back"
                className="shrink-0 flex items-center justify-center text-base-white bg-transparent border-none cursor-pointer p-0"
              >
                <img src={ArrowBack} alt="Back" className="w-6 h-6" />
              </button>

              {/* Search form */}
              <form onSubmit={handleSubmit} className="flex-1 relative flex items-center">
                <img
                  src={SearchInput}
                  alt="Search Movie"
                  className="w-6 h-6 absolute left-4 text-neutral-500 pointer-events-none shrink-0"
                />
                <Input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search Movie"
                  autoFocus
                  className={cn(
                    'w-full h-11 pl-11 py-md bg-neutral-950/60 border border-neutral-800 rounded-xl',
                    'text-neutral-25 text-size-sm placeholder:text-neutral-500',
                    'focus:border-neutral-500/30 transition-all duration-200',
                    query ? 'pr-10' : 'pr-xl'
                  )}
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear"
                    className="absolute right-3 flex items-center justify-center  py-md px-xl cursor-pointer "
                  >
                    <img src={CloseInput} alt="Clear Typing" className="w-4 h-4" />
                  </button>
                )}
              </form>
            </motion.div>
          ) : (
            /* ── NORMAL NAVBAR ── */
            <motion.div
              key="navbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <div className="custom-container h-16 md:h-19 lg:h-22.5 flex flex-row justify-between items-center">
                {/* Left: Logo + Desktop Nav */}
                <div className="flex items-center gap-8xl">
                  <Link to="/" onClick={scrollToTop} className="flex items-start">
                    <Logo />
                  </Link>

                  <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="flex gap-6xl">
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/"
                            onClick={scrollToTop}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              'bg-transparent text-base-white hover:text-primary-200 transition-colors duration-300'
                            )}
                          >
                            Home
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                      <NavigationMenuItem>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/favorites"
                            onClick={scrollToTop}
                            className={cn(
                              navigationMenuTriggerStyle(),
                              'relative flex items-center gap-1 text-base-white hover:text-primary-200 bg-transparent transition-colors duration-300'
                            )}
                          >
                            Favorites
                            {favorites.length > 0 && (
                              <span className="ml-1 w-4 h-4 bg-primary-300 text-neutral-25 text-size-xs font-bold rounded-full flex items-center justify-center">
                                {favorites.length > 9 ? '9+' : favorites.length}
                              </span>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </div>

                {/* Right: Desktop Search + Mobile Icons */}
                <div className="flex items-center gap-3 md:gap-4">
                  {/* Desktop Search */}
                  <form onSubmit={handleSubmit} className="relative w-60.75 h-14 hidden md:block">
                    <div className="relative w-full h-full flex items-center">
                      <img
                        src={SearchIcon}
                        alt="Search Movie"
                        className="w-6 h-6 absolute left-4 text-neutral-500 pointer-events-none"
                      />
                      <Input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search Movie"
                        className="h-full w-full border transition-all duration-200 pl-12 pr-10 bg-neutral-950/60 text-neutral-25 placeholder:text-neutral-500 border-neutral-800 focus:border-neutral-500/30 focus:border"
                      />
                      {query && (
                        <button
                          type="button"
                          onClick={() => setQuery('')}
                          className="absolute right-4 p-0.75 transition-colors cursor-pointer"
                        >
                          <img src={CloseInput} alt="Search Movie" className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </form>

                  {/* Mobile: Search + Hamburger icons */}
                  <div className="md:hidden flex items-center gap-3xl">
                    <button
                      type="button"
                      onClick={openSearch}
                      aria-label="Search"
                      className="flex items-center justify-center bg-transparent border-none cursor-pointer text-base-white p-0"
                    >
                      <img src={SearchIcon} alt="Search Movie" className="w-6 h-6" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(true)}
                      aria-label="Open menu"
                      className="flex items-center justify-center bg-transparent border-none cursor-pointer p-0"
                    >
                      <img src={Hamburger} alt="Menu" className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── MOBILE FULLSCREEN MENU via Portal ── */}
      {createPortal(
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
              onClick={closeMenu}
              className="fixed inset-0 w-full h-full bg-base-black overflow-y-auto overflow-x-hidden"
              style={{ zIndex: 9999 }}
            >
              {/* Header: Logo + Close */}
              <div
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-between p-3xl border-b border-neutral-800"
              >
                <Logo />
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="flex items-center justify-center bg-transparent border-none cursor-pointer p-md"
                >
                  <img src={CloseIcon} alt="Close" className="w-6 h-6" />
                </button>
              </div>

              {/* Nav links */}
              <nav
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col px-3xl py-4xl gap-4xl"
              >
                <Link
                  to="/"
                  onClick={() => {
                    scrollToTop();
                    closeMenu();
                  }}
                  className="text-base-white text-size-lg font-medium no-underline py-xs hover:text-primary-300 transition-colors duration-200"
                >
                  Home
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => {
                    scrollToTop();
                    closeMenu();
                  }}
                  className="text-base-white text-size-lg font-medium no-underline py-xs flex items-center justify-between hover:text-primary-300 transition-colors duration-200"
                >
                  Favorites
                  {favorites.length > 0 && (
                    <span className="w-6 h-6 bg-primary-300 text-neutral-25 text-size-xs font-bold rounded-full flex items-center justify-center">
                      {favorites.length > 9 ? '9+' : favorites.length}
                    </span>
                  )}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
