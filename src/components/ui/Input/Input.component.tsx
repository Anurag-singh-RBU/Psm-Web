import { cn } from "@/lib/utils/cn";
import * as React from "react";
import { IconButton } from "../IconButton";
import { useState } from "react";

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
    ({ className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === "password";
        const inputType = isPassword && showPassword ? "text" : type;

        return (
            <div className="relative w-full">
                <input
                    ref={ref}
                    type={inputType}
                    data-slot="input"
                    className={cn(
                        "file:text-foreground font-mono placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground " +
                        "dark:bg-input/30 border-input flex min-h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-black font-medium tracking-wide " +
                        "transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm " +
                        "file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 " +
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-sm " +
                        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                        className,
                    )}
                    {...props}
                />

                {isPassword && (
                    <IconButton
                        type="button"
                        icon={showPassword ? "eyeOff" : "eye"}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        aria-pressed={showPassword}
                        disabled={props.disabled}
                        onClick={() => setShowPassword((previous) => !previous)}
                        className="absolute right-3 top-[50%] flex-center translate-y-[-50%] hover:bg-muted/50"
                        sound="click"
                    />
                )}
            </div>
        );
    },
);
