import type { FieldPath, FieldValues } from 'react-hook-form';
import { cn } from '@/lib/utils/cn';
import { Badge } from '../../Badge';
import { Input } from '../../Input';
import { FormControl, FormField, FormItem, FormLabel } from '../Form';
import { FieldHint } from '@ui/FieldHint'
import type { FormInputProps } from './FormInput.types';

export const FormInput = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    className,
    isOptional = false,
    reactform,
    label,
    sublabel,
    description,
    inputRef,
    ...inputProps
}: FormInputProps<TFieldValues, TName>) => {
    return (
        <FormField
            control={reactform.control}
            name={inputProps.name}
            rules={{ required: inputProps.required ? 'This field is required' : false }}
            render={({ field, fieldState }) => {
                const hasError = Boolean(fieldState.error);

                return (
                    <FormItem className="w-full">
                        {label ? (
                            <FormLabel className="ml-0.5 flex items-center">
                                <span className="font-mono text-sm">{label}</span>
                                {isOptional ? (
                                    <Badge size="xs" variant={hasError ? 'destructive' : 'secondary'}>
                                        {sublabel ?? 'Optional'}
                                    </Badge>
                                ) : null}
                            </FormLabel>
                        ) : null}

                        <FormControl>
                            <Input
                                {...inputProps}
                                {...field}
                                value={inputProps.type === 'file' ? undefined : field.value}
                                ref={(element) => {
                                    field.ref(element);

                                    if (typeof inputRef === 'function') {
                                        inputRef(element);
                                    } else if (inputRef) {
                                        inputRef.current = element;
                                    }
                                }}
                                id={inputProps.name}
                                required={false}
                                className={cn(
                                    className,
                                    hasError &&
                                    'border-destructive! ring-transparent duration-200 focus-visible:ring-destructive',
                                )}
                                onChange={(event) => {
                                    if (inputProps.type === 'file') {
                                        field.onChange(event.target.files?.[0] ?? null);
                                    } else if (inputProps.type === 'number') {
                                        field.onChange(event.target.value === '' ? '' : Number(event.target.value));
                                    } else {
                                        field.onChange(event);
                                    }

                                    inputProps.onChange?.(event);
                                }}
                            />
                        </FormControl>
                        <FieldHint description={description} />
                    </FormItem>
                );
            }}
        />
    );
};