import type { ToastAction } from "@/components/ui/Toast/Toast.types";

export interface ShowToastOptions {
  message: string;
  action?: ToastAction;
  duration?: number;
}

export const TOAST_DURATION = {
  success: 4000,
  info: 5000,
  warning: 6000,
  error: 6000,
} as const;
