import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export type StickyNoteColor = 'yellow' | 'pink' | 'blue' | 'green' | 'orange' | 'lavender';

export type StickyNoteProps = Omit<ComponentPropsWithoutRef<'div'>, 'title'> & {
    title: string;
    description: ReactNode;
    color?: StickyNoteColor;
    stamp?: string;
    tilt?: number;
};
