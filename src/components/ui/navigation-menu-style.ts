import { cva } from 'class-variance-authority';

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-none bg-background p-md text-md text-base-white transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=open]:text-accent-foreground data-[state=open]:bg-accent/50 data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent'
);
