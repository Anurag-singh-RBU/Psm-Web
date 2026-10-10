import { forwardRef, type MouseEvent } from "react";
import { buttonVariants } from "./Button.variants";
import type { ButtonProps } from "./Button.types";
import { cn } from "@/lib/utils/cn";
import { playSound } from "@/lib/sound/sound.service";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      startAdornment,
      endAdornment,
      isLoading = false,
      sound = "click",
      disabled,
      type = "button",
      className,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !isLoading && sound !== "none") {
        playSound(sound);
      }

      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        onClick={handleClick}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {isLoading ? (
          <span
            className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          startAdornment && (
            <span className="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
              {startAdornment}
            </span>
          )
        )}

        {children}

        {endAdornment && (
          <span className="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
            {endAdornment}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
