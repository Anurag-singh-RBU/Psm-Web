import Mailcheck from 'mailcheck';

export type EmailSuggestion = {
    address: string;
    domain: string;
    full: string;
};

const DOMAINS = [...Mailcheck.defaultDomains, 'rediffmail.com', 'yahoo.co.in'];

export function suggestEmail(email: string): EmailSuggestion | null {
    let result: EmailSuggestion | null = null;

    Mailcheck.run({
        email,
        domains: DOMAINS,
        suggested: (suggestion: EmailSuggestion) => {
            result = suggestion;
        },
        empty: () => {
            result = null;
        },
    });

    return result;
}