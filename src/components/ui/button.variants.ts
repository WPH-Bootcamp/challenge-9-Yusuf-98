import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'h-11 md:h-13 flex flex-row justify-center items-center rounded-full text-size-sm md:text-size-md text-neutral-25 font-semibold shadow-inner transition-all duration-300 ease-in-out cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary-300 hover:bg-primary-400 active:border-bg-primary-200 p-md gap-md',
        secondary:
          'bg-neutral-950 border border-neutral-900 hover:bg-neutral-800 active:bg-neutral-800',
        favorite:
          'bg-neutral-950/60 backdrop-blur-2xl w-11 md:w-13 shrink-0 border border-neutral-900 hover:border-neutral-200 hover:scale-105',
      },
      isFavorite: {
        true: 'bg-neutral-950/60 border-neutral-800 z-10',
        false: 'bg-neutral-950/60 border-white/30 hover:border-white/60',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
