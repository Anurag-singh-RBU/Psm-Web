import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { IconName } from "../Icon/Icon.types";

export type IconButtonProps = Omit<ComponentPropsWithoutRef<"button">, "aria-label"> & {
  icon: IconName;
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  color?: CSSProperties["backgroundColor"];
  iconColor?: CSSProperties["color"];
  sound?: "none" | "click";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SIZES = {
  sm: { button: "size-7", icon: "sm" },
  md: { button: "size-8", icon: "md" },
  lg: { button: "size-9", icon: "lg" },
} as const;
