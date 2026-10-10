import { forwardRef } from "react";
import { Icon } from "@ui/Icon";
import { cn } from "@/lib/utils/cn";
import { toastVariants } from "./Toast.variants";
import { variantIconClasses, variantIcons, type ToastProps } from "./Toast.types";
import { Button } from "../Button";
import { IconButton } from "../IconButton/IconButton.component";

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ variant, size, message, action, onDismiss, className, ...props }, ref) => {
    return (
      <div ref={ref} role="status" className={cn(toastVariants({ size }), className)} {...props}>
        <span
          className={cn(
            "inline-flex size-7 shrink-0 items-center justify-center rounded-full",
            variantIconClasses[variant],
          )}
          aria-hidden="true"
        >
          <Icon name={variantIcons[variant]} size="sm" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm leading-5 text-card-foreground">{message}</p>
        </div>

        {action && (
          <Button variant="ghost" onClick={action.onClick}>
            {action.label}
          </Button>
        )}

        {onDismiss && (
          <IconButton
            aria-label="Dismiss notification"
            onClick={onDismiss}
            icon="close"
            iconColor="var(--muted-foreground)"
            className="enabled:hover:bg-muted/50"
          />
        )}
      </div>
    );
  },
);

Toast.displayName = "Toast";
