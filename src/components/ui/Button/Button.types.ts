import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./Button.variants";

export type ButtonSound = "click" | "none";

export type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    startAdornment?: ReactNode;
    endAdornment?: ReactNode;
    isLoading?: boolean;
    sound?: ButtonSound;
  };
