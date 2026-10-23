import type { ComponentPropsWithoutRef } from "react";

export type CollapseProps = ComponentPropsWithoutRef<'div'> & {
    open: boolean;
    closedClassName?: string;
};