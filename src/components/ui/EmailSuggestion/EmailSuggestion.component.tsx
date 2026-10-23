import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { Icon } from '@ui/Icon';
import { useEmailSuggestion } from '@/hooks/useSuggestEmail';
import { cn } from '@/lib/utils/cn';
import type { EmailSuggestionProps } from './EmailSuggestion.types';

const actionStyles = 'rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring';

export function EmailSuggestion({ name = 'email', className }: EmailSuggestionProps) {
    const { control, setValue, setFocus } = useFormContext();
    const email = (useWatch({ control, name }) as string | undefined) ?? '';
    const { suggestion, dismiss } = useEmailSuggestion(email);
    const [appliedFor, setAppliedFor] = useState<string | null>(null);

    const showApplied = appliedFor !== null && email.trim() === appliedFor;
    const isOpen = Boolean(suggestion) || showApplied;

    useEffect(() => {
        if (!appliedFor) return;
        const id = window.setTimeout(() => setAppliedFor(null), 2500);
        return () => window.clearTimeout(id);
    }, [appliedFor]);

    const accept = () => {
        if (!suggestion) return;
        setValue(name, suggestion.full, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
        setAppliedFor(suggestion.full);
        setFocus(name);
    };

    return (
        <div
            aria-live="polite"
            className={cn(
                'grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none ml-0.5',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                className,
            )}>
            <div className="-mx-1 overflow-hidden px-1">
                {suggestion && (
                    <p className="text-sm text-muted-foreground">
                        Did you mean{' '}
                        <button type="button" onClick={accept} className={cn(actionStyles, 'font-mono tracking-normal text-link hover:text-black hover:font-semibold transform transition-all duration-300')}>
                            {suggestion.address}@<strong className='text-black'>{suggestion.domain}</strong>
                        </button>
                        {' '}?{' '}
                        <button type="button" onClick={dismiss} className={cn(actionStyles, 'text-primary/90 font-semibold hover:text-primary-active')}>
                            Keep mine
                        </button>
                    </p>
                )}

                {showApplied && (
                    <div className="flex items-center gap-1.5 pt-2 pb-1 text-sm font-medium text-success/80">
                        <span aria-hidden="true" className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                            <Icon name="check" className="size-3" />
                        </span>
                        Updated to <p className='text-black font-mono'>{appliedFor}</p>
                    </div>
                )}
            </div>
        </div>
    );
}