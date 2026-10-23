import { Button } from "@ui/Button";
import { Form } from "@ui/Form/Form";
import { FormInput } from "@ui/Form/FormInput";
import { Icon } from "@ui/Icon";
import { Separator } from "@ui/Seperator";
import { TextLink } from "@ui/TextLink";
import { useForm } from "react-hook-form";

import { playSound } from "@/lib/sound/sound.service";
import { ROUTE_PATHS } from "@/router/route.constants";

import type { SignupFormValues } from "./SignupForm.types";
import { EmailSuggestion } from "@ui/EmailSuggestion";

export const SignupForm = () => {
    const reactform = useForm<SignupFormValues>({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
        mode: "onTouched",
        reValidateMode: "onChange",
    });

    const arrowState = reactform.formState.isValid ? "on" : "launch";

    const onSubmit = async (values: SignupFormValues) => {
        // Connect the authentication service here.
        console.info("Login submitted for:", values.email);

        await new Promise((resolve) => setTimeout(resolve, 200000));
        reactform.reset();
    };

    const termsRegistration = reactform.register("terms", {
        required: "You must agree to continue",
    });

    return (
        <section className="w-full max-w-110">
            <header className="mb-5 relative">
                <div className="mb-4">
                    <Icon name="shards" className="h-16 w-24 absolute sm:-top-10 sm:left-25 -top-11 left-20" aria-hidden="true" />
                </div>

                <h1 className="font-mono font-bold text-[28px] leading-7 text-foreground sm:text-[32px] sm:leading-10 uppercase">
                    Sign up
                </h1>

                <p className="mt-2 leading-7 text-muted-foreground font-medium">
                    Already on XPire ?{" "}
                    <TextLink to={ROUTE_PATHS.LOGIN} aria-label="Navigate to login page">
                        Si<span className="font-mono">g</span>n In
                    </TextLink>
                </p>
            </header>

            <div className="space-y-3">
                <Button
                    variant="outline"
                    startAdornment={<Icon name="google" />}
                    className="w-full tracking-wide"
                    aria-label="Continue with Google"
                >
                    <span>
                        Continue with Goo<span className="font-mono">g</span>le
                    </span>
                </Button>

                <p className="text-muted-foreground/90 text-sm">
                    By continuin<span className="font-mono">g</span> , you a<span className="font-mono">g</span>ree to XPire's{" "}
                    <TextLink to="#" aria-label="View privacy policy">
                        Privacy Policy
                    </TextLink>{" "}
                    and{" "}
                    <TextLink to="#" aria-label="View cookie use policy">
                        Cookie Use
                    </TextLink>
                    .
                </p>
            </div>

            <Separator label="OR" className="text-base text-muted-foreground my-4 sm:my-7" aria-hidden="true" />

            <Form {...reactform}>
                <form noValidate onSubmit={reactform.handleSubmit(onSubmit)} className="flex flex-col">
                    <div className="flex flex-col">
                        <FormInput
                            reactform={reactform}
                            name="email"
                            type="email"
                            label="Email"
                            placeholder=" "
                            disabled={reactform.formState.isSubmitting}
                            autoComplete="email"
                            inputMode="email"
                            autoCapitalize="none"
                            spellCheck={false}
                            required
                            aria-label="Enter your email address"
                        />
                        <EmailSuggestion name="email" className="-mt-4" />
                    </div>

                    <div className="flex flex-col gap-2.5 mt-4">
                        <FormInput
                            reactform={reactform}
                            name="password"
                            type="password"
                            label="Password"
                            placeholder=" "
                            disabled={reactform.formState.isSubmitting}
                            description={reactform.getValues("password")?.length < 8 ? "Use atleast 8 characters" : " "}
                            autoComplete="current-password"
                            required
                            aria-label="Enter your password"
                        />

                        <FormInput
                            reactform={reactform}
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            placeholder=" "
                            disabled={reactform.watch("password") === "" || reactform.formState.isSubmitting}
                            description={reactform.watch("password") === "" ? "First enter a password" : "Re enter the password"}
                            required
                            aria-label="Re enter your password"
                        />
                    </div>

                    <div className="flex gap-3 rounded-md transition-shadow duration-200 my-2">
                        <input
                            id="terms"
                            type="checkbox"
                            {...termsRegistration}
                            onChange={(event) => {
                                playSound("click");
                                termsRegistration.onChange(event);
                            }}
                            className="checkbox mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border border-muted-foreground/60 transition-all duration-200
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                            disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Agree to terms and conditions"
                            disabled={reactform.formState.isSubmitting} />

                        <label htmlFor="terms" className="cursor-pointer pt-0.5 text-sm leading-5 text-muted-foreground">
                            I a<span className="font-mono">g</span>ree to the{" "}
                            <TextLink to="#" aria-label="View privacy policy">
                                Privacy Policy
                            </TextLink>{" "}
                            and{" "}
                            <TextLink to="#" aria-label="View cookie use policy">
                                Cookie Use
                            </TextLink>
                            .
                        </label>
                    </div>

                    <div className="cta-group relative">
                        <Button
                            type="submit"
                            className="mt-6 w-full font-mono font-semibold"
                            isLoading={reactform.formState.isSubmitting}
                            disabled={reactform.formState.isSubmitting || !reactform.formState.isValid}>
                            {reactform.formState.isSubmitting ? null : "Continue"}
                        </Button>

                        {!reactform.formState.isSubmitting && reactform.formState.isValid && (
                            <div
                                aria-hidden="true"
                                data-state={arrowState}
                                className="cta-arrow -right-2 -bottom-20 sm:-right-25 sm:-bottom-22">
                                <div className="cta-arrow__nudge">
                                    <div className="cta-arrow__draw">
                                        <Icon name="loopArrow" aria-hidden="true" className="h-25 w-25 sm:h-30 sm:w-30" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </form>
            </Form>
        </section>
    );
};
