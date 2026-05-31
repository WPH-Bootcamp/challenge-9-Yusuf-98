import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxPage = Math.min(totalPages, 500);

  const pages: (number | '...')[] = [];
  if (maxPage <= 7) {
    for (let i = 1; i <= maxPage; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(maxPage - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < maxPage - 2) pages.push('...');
    pages.push(maxPage);
  }

  return (
    <div className="flex items-center justify-center gap-1 py-10 px-[140px]">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`dot-${i}`} className="px-2 text-white/30 text-sm">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={cn(
              'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
              currentPage === page
                ? 'text-white'
                : 'text-white/40 hover:text-white hover:bg-white/10'
            )}
            style={currentPage === page ? { background: '#961200' } : {}}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= maxPage}
        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
