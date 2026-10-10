import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";
import { iconRegistry } from "./Icon.registry";
import { ICON_SIZES, type IconProps } from "./Icon.types";

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", className, "aria-label": ariaLabel, ...props }, ref) => {
    const { viewBox, content } = iconRegistry[name];

    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden={ariaLabel ? undefined : true}
        aria-label={ariaLabel}
        className={cn("shrink-0", ICON_SIZES[size], className)}
        {...props}
      >
        {content}
      </svg>
    );
  },
);

Icon.displayName = "Icon";
