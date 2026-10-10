"use client";

import { cn } from "@/lib/utils/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { IconButton } from "../IconButton";

function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

function DialogTrigger({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

function DialogOverlay({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-xs", className)}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  hideCloseButton = false,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & { hideCloseButton?: boolean }) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background border-0 fixed left-1/2 top-1/2 z-50 grid",
          "w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
          "rounded-[10px] shadow-lg outline-none sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        {!hideCloseButton && (
          <DialogPrimitive.Close
            className="data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-3 rounded-xs opacity-70 transition-opacity hover:opacity-100    
                    disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5"
          >
            <IconButton
              aria-label="Close"
              icon="close"
              iconColor="var(--muted-foreground)"
              className="enabled:hover:bg-muted/50"
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

const DialogIcon = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("bg-muted-foreground/20 flex-center h-10 w-10 shrink-0 rounded-lg", className)} {...props} />
);
DialogIcon.displayName = "DialogIcon";

const DialogHeaderContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-row items-center gap-2 border-b border-border p-3", className)} {...props} />
);
DialogHeaderContainer.displayName = "DialogHeaderContainer";

const DialogContentContainer = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-4 p-3", className)} {...props} />
);
DialogContentContainer.displayName = "DialogContentContainer";

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(className, "flex flex-col justify-center space-y-1 text-start sm:text-left")} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-row justify-end space-x-2 border-t border-border p-3", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-sm leading-none font-medium capitalize", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground/80 text-xs leading-none tracking-tight", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogIcon,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogHeaderContainer,
  DialogContentContainer,
};
