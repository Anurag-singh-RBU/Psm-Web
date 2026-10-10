import { forwardRef } from "react";
import { Icon } from "@ui/Icon";
import { cn } from "@/lib/utils/cn";
import type { IconButtonProps } from "./IconButton.types";

const sizes = {
  sm: { button: "size-7", icon: "sm" },
  md: { button: "size-8", icon: "md" },
  lg: { button: "size-9", icon: "lg" },
} as const;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", color, iconColor, style, className, type = "button", ...props }, ref) => {
    const dimensions = sizes[size];

    return (
      <button
        ref={ref}
        type={type}
        style={{
          ...style,
          backgroundColor: color,
        }}
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full",
          "transition-colors duration-150",
          "focus-visible:outline-2 focus-visible:outline-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          "motion-reduce:transition-none",
          dimensions.button,
          className,
        )}
        {...props}
      >
        <Icon name={icon} size={dimensions.icon} aria-hidden="true" color={iconColor} />
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
