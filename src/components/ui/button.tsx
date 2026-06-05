import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button.variants';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  image?: React.ReactNode;
  isFavorite?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isFavorite, children, ...props }, ref) => {
    const title = isFavorite ? 'Remove from favorites' : 'Add to favorites';

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, isFavorite, className }))}
        title={title}
        {...props}
      >
        {children}
      </button>
    );
  }
);
