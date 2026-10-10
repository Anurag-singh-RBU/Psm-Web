import { toast as sonnerToast } from "sonner";
import { createElement } from "react";
import { TOAST_DURATION, type ShowToastOptions } from "./Toast.types";
import type { ToastVariant } from "@ui/Toast/Toast.types";
import { Toast } from "@ui/Toast";

const showToast = (variant: ToastVariant, { message, action, duration }: ShowToastOptions) => {
  return sonnerToast.custom(
    (id) =>
      createElement(Toast, {
        variant,
        message,
        action,
        onDismiss: () => sonnerToast.dismiss(id),
      }),
    {
      duration: duration ?? TOAST_DURATION[variant],
    },
  );
};

export const toast = {
  success: (options: ShowToastOptions) => showToast("success", options),

  info: (options: ShowToastOptions) => showToast("info", options),

  warning: (options: ShowToastOptions) => showToast("warning", options),

  error: (options: ShowToastOptions) => showToast("error", options),

  dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
};
