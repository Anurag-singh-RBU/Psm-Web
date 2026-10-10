import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2.5",
    "rounded-lg border border-transparent font-medium whitespace-nowrap select-none",
    "transition-[color, background-color, border-color] duration-400 ease-in-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-busy:cursor-progress",
    "pointer-coarse:min-h-11",
    "motion-reduce:transition-none",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-0 bg-brand-500 text-primary-foreground enabled:hover:bg-primary-hover enabled:active:bg-primary-active",
        outline:
          "border-border bg-transparent text-foreground enabled:hover:bg-foreground/5 enabled:active:bg-foreground/10",
        destructive:
          "bg-destructive border-0 text-primary-foreground enabled:hover:bg-destructive/90 enabled:hover:text-primary-foreground enabled:active:bg-destructive/80 enabled:active:text-primary-foreground",
        ghost: "bg-transparent border-0 enabled:hover:bg-foreground/5 enabled:active:bg-foreground/10",
      },
      size: {
        sm: "min-h-8 px-3 text-sm",
        md: "min-h-10 px-4 text-sm",
        lg: "min-h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);
