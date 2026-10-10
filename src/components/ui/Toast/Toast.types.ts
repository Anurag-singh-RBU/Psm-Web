import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import type { toastVariants } from "./Toast.variants";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export type ToastProps = ComponentPropsWithoutRef<"div"> &
  VariantProps<typeof toastVariants> & {
    variant: ToastVariant;
    message: ReactNode;
    action?: ToastAction;
    onDismiss?: () => void;
  };

export const variantIcons = {
  success: "check",
  error: "close",
  warning: "warning",
  info: "info",
} as const;

export const variantIconClasses = {
  success: "bg-green-500 text-white",
  error: "bg-destructive text-white",
  warning: "bg-warning text-white",
  info: "bg-info text-white",
} as const;
