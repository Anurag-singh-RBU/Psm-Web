import { forwardRef } from "react";
import { Icon } from "@ui/Icon";
import { cn } from "@/lib/utils/cn";
import { SIZES, type IconButtonProps } from "./IconButton.types";
import { playSound } from "@/lib/sound/sound.service";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", color, iconColor, style, sound, onClick, className, type = "button", ...props }, ref) => {

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (sound == "click") {
        playSound(sound);
      }

      onClick?.(event);
    };

    const dimensions = SIZES[size];

    return (
      <button
        ref={ref}
        type={type}
        onClick={handleClick}
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
