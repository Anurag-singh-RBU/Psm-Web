import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { iconRegistry } from "./Icon.registry";

export type IconName = keyof typeof iconRegistry;

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

export const ICON_SIZES = {
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8",
};

export interface IconProps extends ComponentPropsWithoutRef<"svg"> {
  name: IconName;
  size?: IconSize;
}

export interface IconDefinition {
  viewBox: string;
  content: ReactNode;
}
