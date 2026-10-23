import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

export interface FormInputProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends React.InputHTMLAttributes<HTMLInputElement> {
    name: TName;
    label?: string | undefined;
    description?: string | undefined;
    reactform: UseFormReturn<TFieldValues>;
    sublabel?: string | undefined;
    isOptional?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
}