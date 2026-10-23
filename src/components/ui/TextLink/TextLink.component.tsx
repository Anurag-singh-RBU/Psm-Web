import { cn } from '@/lib/utils/cn';
import { Link, type LinkProps } from 'react-router-dom';

export function TextLink({ className, ...props }: LinkProps) {
    return (
        <Link
            className={cn(
                'font-semibold text-primary hover:text-primary-active',
                className,
            )}
            {...props}
        />
    );
}