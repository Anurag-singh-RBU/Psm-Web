import { cn } from '@/lib/utils/cn';
import type { CollapseProps } from './Collapse.types';

export function Collapse({ open, closedClassName, className, children, ...props }: CollapseProps) {
    return (
        <div
            inert={!open}
            className={cn(
                'grid transition-[grid-template-rows, opacity, margin] duration-200 ease-out motion-reduce:transition-none',
                open ? 'grid-rows-[1fr] opacity-100' : cn('grid-rows-[0fr] opacity-0', closedClassName),
                className,
            )}
            {...props}>
            <div className="min-h-0 overflow-hidden">{children}</div>
        </div>
    );
}