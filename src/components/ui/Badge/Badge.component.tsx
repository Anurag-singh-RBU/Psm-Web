import { type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { badgeVariants } from "./Badge.variants";

function Badge({
    className,
    variant,
    asChild = false,
    icon = false,
    size,
    ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean; icon?: boolean }) {
    const Comp = asChild ? Slot : "span";

    return <Comp data-slot="badge" className={cn(badgeVariants({ variant, size, icon }), className)} {...props} />;
}

export { Badge, badgeVariants };