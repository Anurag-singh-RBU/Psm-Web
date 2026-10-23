export type VerifyEmailContainerProps = {
    email?: string;
    onVerify?: (otp: string) => void | Promise<void>;
    onResendCode?: () => void | Promise<void>;
};
