import { cva } from "class-variance-authority";

export const toastVariants = cva(
  [
    "flex w-full items-center",
    "rounded-2xl border border-border/80 bg-card",
    "text-foreground",
    "shadow-[0_8px_30px_rgb(17_19_24/0.08)]",
    "select-none",
  ],
  {
    variants: {
      size: {
        sm: ["min-h-12", "max-w-[min(100%,22rem)]", "gap-2.5", "px-3", "py-2"],
        md: ["min-h-14", "max-w-[min(100%,26rem)]", "gap-3", "px-3.5", "py-2.5"],
        lg: ["min-h-16", "max-w-[min(100%,30rem)]", "gap-3", "px-4", "py-3"],
      },
    },

    defaultVariants: {
      size: "md",
    },
  },
);
