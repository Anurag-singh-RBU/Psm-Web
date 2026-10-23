import { type EmailSuggestion, suggestEmail } from '@/lib/utils/suggestEmail';
import { useCallback, useEffect, useRef, useState } from 'react';

const DEBOUNCE_MS = 700;

export function useEmailSuggestion(email: string) {
    const [suggestion, setSuggestion] = useState<EmailSuggestion | null>(null);
    const dismissedRef = useRef('');

    useEffect(() => {
        setSuggestion(null);

        const value = email.trim();
        if (!value || value === dismissedRef.current) return;

        const id = window.setTimeout(() => setSuggestion(suggestEmail(value)), DEBOUNCE_MS);
        return () => window.clearTimeout(id);
    }, [email]);

    const dismiss = useCallback(() => {
        dismissedRef.current = email.trim();
        setSuggestion(null);
    }, [email]);

    return { suggestion, dismiss };
}