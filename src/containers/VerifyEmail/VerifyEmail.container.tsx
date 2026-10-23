
import { useEffect, useRef, useState } from "react";

import { Button } from "@ui/Button";
import { Icon } from "@ui/Icon";
import { StickyNote } from "@ui/StickyNote";
import { AnnotatedText } from "@/components/ui/AnnotatedText";

import type { VerifyEmailContainerProps } from "./VerifyEmail.types";

const RESEND_COOLDOWN_SECONDS = 30;

export const VerifyEmail = ({
    email = "an••••••@gmail.com",
    onVerify,
    onResendCode,
}: VerifyEmailContainerProps) => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(
        RESEND_COOLDOWN_SECONDS,
    );
    const [message, setMessage] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [isOtpInvalid, setIsOtpInvalid] = useState(false);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const otpWrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (resendCooldown <= 0 || isVerified) return;

        const timer = window.setTimeout(() => {
            setResendCooldown((current) => Math.max(0, current - 1));
        }, 1000);

        return () => window.clearTimeout(timer);
    }, [resendCooldown, isVerified]);

    const formatCountdown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds,
        ).padStart(2, "0")}`;
    };

    const triggerShake = () => {
        const element = otpWrapperRef.current;

        if (!element) return;

        element.getAnimations().forEach((animation) => animation.cancel());

        element.animate(
            [
                { transform: "translateX(0)" },
                { transform: "translateX(-6px)" },
                { transform: "translateX(6px)" },
                { transform: "translateX(-5px)" },
                { transform: "translateX(5px)" },
                { transform: "translateX(0)" },
            ],
            {
                duration: 400,
                easing: "ease-in-out",
            },
        );
    };

    const showOtpError = (errorMessage: string) => {
        setIsOtpInvalid(true);
        setMessage(errorMessage);
        triggerShake();
        setOtp(Array(6).fill(""));
        inputRefs.current[0]?.focus();
    };

    const clearOtpError = () => {
        setIsOtpInvalid(false);
        setMessage("");
    };

    const handleOtpChange = (index: number, value: string) => {
        const digit = value.replace(/\D/g, "").slice(-1);

        setOtp((current) => {
            const updated = [...current];
            updated[index] = digit;
            return updated;
        });

        clearOtpError();

        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (
        event: React.ClipboardEvent<HTMLInputElement>,
    ) => {
        event.preventDefault();

        const pastedDigits = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, 6);

        const updated = Array(6).fill("");

        pastedDigits.split("").forEach((digit, index) => {
            updated[index] = digit;
        });

        setOtp(updated);
        clearOtpError();

        inputRefs.current[Math.min(pastedDigits.length, 5)]?.focus();
    };

    const handleKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        if (event.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerify = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const code = otp.join("");

        if (code.length !== 6) {
            showOtpError("Please enter all 6 digits");
            return;
        }

        if (!onVerify) {
            showOtpError("Verification service is not connected yet");
            return;
        }

        try {
            setIsSubmitting(true);
            clearOtpError();

            await onVerify(code);

            setIsVerified(true);
            setIsOtpInvalid(false);
            setMessage("");
        } catch {
            showOtpError("Invalid or expired code. Please try again");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResend = async () => {
        if (
            !onResendCode ||
            isResending ||
            resendCooldown > 0 ||
            isVerified
        ) {
            return;
        }

        try {
            setIsResending(true);
            clearOtpError();

            await onResendCode();

            setOtp(Array(6).fill(""));
            setResendCooldown(RESEND_COOLDOWN_SECONDS);
            inputRefs.current[0]?.focus();
        } catch {
            setMessage("Unable to resend the code. Please try again");
        } finally {
            setIsResending(false);
        }
    };

    const openGmail = () => {
        window.open(
            "https://mail.google.com/",
            "_blank",
            "noopener,noreferrer",
        );
    };

    return (
        <section className="w-full max-w-115">
            <header className="relative mb-10">
                <div className="mb-4" aria-hidden="true">
                    <Icon
                        name="shards"
                        className="absolute -top-11 left-40 h-16 w-24 sm:-top-10 sm:left-46" />
                </div>

                <h1 className="font-mono text-[28px] font-bold uppercase leading-7 text-foreground sm:text-[32px] sm:leading-10">
                    Verify Email
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-1 font-medium leading-6 text-muted-foreground">
                    <span>Enter a 6 digit code sent to</span>

                    <span className="font-mono font-semibold tracking-tight text-black">
                        {email}
                    </span>

                    <button
                        type="button"
                        onClick={openGmail}
                        aria-label="Open Gmail"
                        className="ml-1 mb-1 shrink-0 text-primary hover:text-primary-active">
                        <Icon name="link" className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <form onSubmit={handleVerify}>
                <div
                    ref={otpWrapperRef}
                    className="flex-center gap-2.5 sm:gap-4"
                    aria-label="Six-digit verification code">
                    {otp.map((digit, index) => (
                        <div key={index} className="contents">
                            {index === 3 && (
                                <span
                                    aria-hidden="true"
                                    className="px-0.5 text-2xl font-bold sm:px-1">
                                    -
                                </span>
                            )}

                            <input
                                ref={(element) => {
                                    inputRefs.current[index] = element;
                                }}
                                aria-label={`Verification digit ${index + 1}`}
                                aria-invalid={isOtpInvalid}
                                aria-describedby={
                                    isOtpInvalid
                                        ? "otp-error-message"
                                        : undefined
                                }
                                autoComplete={
                                    index === 0 ? "one-time-code" : "off"
                                }
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                disabled={isSubmitting || isVerified}
                                onChange={(event) =>
                                    handleOtpChange(index, event.target.value)
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(index, event)
                                }
                                onPaste={handlePaste}
                                className={[
                                    "h-12.5 min-w-0 flex-1 sm:rounded-[19px] rounded-lg border-2 font-mono",
                                    "bg-white text-center text-2xl sm:text-3xl font-bold text-black",
                                    "outline-none transition-colors duration-200 sm:h-15 sm:max-w-26 sm:text-2xl",
                                    isVerified
                                        ? "border-success bg-[#E8F7EF] ring-0 focus:ring-4 focus:ring-success/20"
                                        : isOtpInvalid
                                            ? "border-destructive bg-destructive/5 ring-4 ring-destructive/20 focus:border-destructive focus:ring-destructive/30"
                                            : "border-[#D7D2C8] focus:border-primary focus:ring-4 focus:ring-brand-100",
                                ].join(" ")}
                            />
                        </div>
                    ))}
                </div>

                {isVerified && (
                    <div
                        role="status"
                        className="flex items-center justify-center gap-3 text-center text-base font-semibold text-success-foreground sm:text-xl">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E4F6EC]">
                            <Icon name="verifiedCheck" className="h-5 w-5" />
                        </span>
                        Email verified successfully.
                    </div>
                )}

                {message && (
                    <p
                        id="otp-error-message"
                        role="alert"
                        className="mt-3 ml-1 flex items-center gap-2 text-sm font-medium text-destructive">
                        <Icon name="error" className="h-5 w-5 shrink-0" />
                        {message}
                    </p>
                )}

                <Button
                    type="submit"
                    className="mt-10 mb-3 w-full font-mono"
                    sound="none"
                    disabled={isSubmitting || isVerified || otp.some((digit) => digit === "")}>
                    {isSubmitting
                        ? "Verifying"
                        : isVerified ? "Verified" : "Verify"}
                </Button>
            </form>

            <div className="pointer-events-none flex-center flex-wrap select-none text-muted-foreground">
                <span className="font-medium">Didn’t get it ?</span>

                {resendCooldown > 0 ? (
                    <span
                        aria-live="polite"
                        className="ml-1 inline-flex min-h-11 items-center text-[15px] font-medium text-primary">
                        Resend code{" "}
                        <span className="ml-1 font-mono">
                            {formatCountdown(resendCooldown)}
                        </span>
                    </span>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        aria-label="Resend verification code"
                        className="ml-1 min-h-11 px-1 text-[16px] font-medium text-primary hover:bg-transparent 
                        hover:text-primary-active focus-visible:bg-transparent focus-visible:text-primary-active focus-visible:ring-0"
                        onClick={handleResend}
                        disabled={isResending || isVerified}>
                        {isResending ? "Sending" : "Resend code"}
                    </Button>
                )}
            </div>

            <aside className="mt-15 flex items-start gap-4">
                <StickyNote
                    title="Can’t find it ?"
                    color="yellow"
                    tilt={-1.6}
                    className="mx-auto font-medium"
                    description={
                        <>
                            Check your spam folder. The code will expire in{" "}
                            <AnnotatedText
                                variant="circle"
                                color="text-destructive/30"
                                className="mt-1">
                                10 minutes
                            </AnnotatedText>.
                        </>
                    }
                />
            </aside>
        </section>
    );
};
