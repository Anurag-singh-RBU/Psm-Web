import { useState, type ReactNode } from 'react';
import { Collapse } from '@ui/Collapse';
import type { FieldHintProps, Hint } from './FieldHint.types';
import { FormDescription, FormMessage, useFormField } from '../Form/Form';

const hasContent = (node: ReactNode) => !(node === null || node === undefined || node === false || (typeof node === 'string' && node.trim() === ''));

export function FieldHint({ description }: FieldHintProps) {
    const { error } = useFormField();

    const hint = hasContent(description) ? description : null;
    const message = error?.message ? String(error.message) : null;

    const current: Hint | null = message
        ? { kind: 'error', node: message }
        : hint
            ? { kind: 'hint', node: hint }
            : null;

    const [shown, setShown] = useState<Hint | null>(current);

    if (current && (shown?.kind !== current.kind || shown.node !== current.node)) {
        setShown(current);
    }

    const display = current ?? shown;

    return (
        <Collapse open={current !== null} className="min-h-5" aria-live="polite">

            <div className="pl-0.5 mb-3">
                {display?.kind === 'error' ? (
                    <FormMessage>{display.node}</FormMessage>
                ) : display ? (
                    <FormDescription>{display.node}</FormDescription>
                ) : null}
            </div>

        </Collapse>
    );
}
