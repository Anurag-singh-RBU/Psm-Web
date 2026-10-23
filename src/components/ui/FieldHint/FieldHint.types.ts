import type { ReactNode } from "react";

export type Hint = { kind: 'error' | 'hint'; node: ReactNode };

export type FieldHintProps = {
    description?: ReactNode;
};
