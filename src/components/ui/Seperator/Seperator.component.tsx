import { cn } from '@/lib/utils/cn';
import type { SeparatorProps } from './Seperator.types';

export const Separator = ({ label, className }: SeparatorProps) => {
    return (
        <div role="separator" className={cn('flex w-full items-center gap-4', className)}>
            <div className="h-0.5 flex-1"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, var(--border) 1.2px, transparent 1.3px)',
                    backgroundSize: '6px 2px',
                    backgroundRepeat: 'repeat-x',
                }}
            />

            {label && (
                <span className="shrink-0 text-sm text-muted-foreground">
                    {label}
                </span>
            )}

            <div
                className="h-0.5 flex-1"
                style={{
                    backgroundImage:
                        'radial-gradient(circle, var(--border) 1.2px, transparent 1.3px)',
                    backgroundSize: '6px 2px',
                    backgroundRepeat: 'repeat-x',
                }}
            />
        </div>
    );
};
