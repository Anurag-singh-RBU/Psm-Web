import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import type { IconName } from "../Icon/Icon.types";

export type IconButtonProps = Omit<ComponentPropsWithoutRef<"button">, "aria-label"> & {
  icon: IconName;
  "aria-label": string;
  size?: "sm" | "md" | "lg";
  color?: CSSProperties["backgroundColor"];
  iconColor?: CSSProperties["color"];
};
