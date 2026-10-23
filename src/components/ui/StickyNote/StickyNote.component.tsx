import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils/cn';
import type { StickyNoteProps } from './StickyNote.types';
import './StickyNote.styles.css';

export const StickyNote = ({
    title,
    description,
    color = 'yellow',
    stamp,
    tilt = -1.6,
    className,
    style,
    ...props
}: StickyNoteProps) => {
    return (
        <div
            role="note"
            data-color={color}
            style={{ '--tilt': `${tilt}deg`, ...style } as CSSProperties}
            className={cn('sticky-note', className)}
            {...props}>
            <span className="sticky-note__tape" aria-hidden="true" />
            <div className="sticky-note__paper">
                <span className="sticky-note__title">{title}</span>
                <div className="sticky-note__text">{description}</div>
            </div>
            <span className="sticky-note__flap" aria-hidden="true" />
            {stamp ? (
                <span className="sticky-note__stamp" aria-hidden="true">
                    {stamp}
                </span>
            ) : null}
        </div>
    );
}
