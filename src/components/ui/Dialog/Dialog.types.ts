import type { ComponentPropsWithoutRef } from "react";
import type * as DialogPrimitive from "@radix-ui/react-dialog";

export type DialogContentProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: "sm" | "md" | "lg";
  hideCloseButton?: boolean;
};

export type DialogIconProps = ComponentPropsWithoutRef<"div">;

export type DialogContainerProps = ComponentPropsWithoutRef<"div">;

export type DialogTitleProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Title>;

export type DialogDescriptionProps = ComponentPropsWithoutRef<typeof DialogPrimitive.Description>;
