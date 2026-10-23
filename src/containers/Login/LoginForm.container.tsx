import { Form } from '@ui/Form/Form';
import { FormInput } from '@ui/Form/FormInput';
import { Icon } from '@ui/Icon';
import { Separator } from '@ui/Seperator';
import { ROUTE_PATHS } from '@/router/route.constants';
import { Button } from '@ui/Button';
import { useForm } from 'react-hook-form';
import { TextLink } from '@ui/TextLink';
import type { LoginFormValues } from './LoginForm.types';

export const LoginForm = () => {
    const reactform = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onTouched',
        reValidateMode: 'onChange',
    });

    const onSubmit = (values: LoginFormValues) => {
        // Connect the authentication service here.
        console.info('Login submitted for:', values.email);
    };

    const arrowState = reactform.formState.isValid ? "on" : "launch";

    return (
        <section className="w-full max-w-110">
            <header className="mb-5 relative">
                <div className="mb-4">
                    <Icon name="shards" className="h-16 w-24 absolute sm:-top-10 sm:left-25 -top-11 left-20" aria-hidden="true" />
                </div>

                <h1 className="font-mono font-bold text-[28px] leading-7 text-foreground sm:text-[32px] sm:leading-10 uppercase">
                    Sign in
                </h1>

                <p className="mt-2 leading-7 text-muted-foreground font-medium">
                    New to XPire ?{' '}
                    <TextLink to={ROUTE_PATHS.SIGNUP} aria-label="Navigate to signup page">
                        Join now
                    </TextLink>
                </p>
            </header>

            <div className="space-y-3">
                <Button variant="outline" startAdornment={<Icon name="google" />} className="w-full tracking-wide" aria-label="Continue with Google">
                    <span>Continue with Goo<span className="font-mono">g</span>le</span>
                </Button>

                <p className="text-muted-foreground/90 text-sm">
                    By continuin<span className="font-mono">g</span> , you a<span className="font-mono">g</span>ree to XPire's{' '}
                    <TextLink to="#" aria-label="View privacy policy">
                        Privacy Policy
                    </TextLink>
                    {' '}and{' '}
                    <TextLink to="#" aria-label="View cookie use policy">
                        Cookie Use
                    </TextLink>
                    .
                </p>
            </div>

            <Separator label="OR" className='text-base text-muted-foreground my-4 sm:my-7' aria-hidden="true" />

            <Form {...reactform}>
                <form noValidate onSubmit={reactform.handleSubmit(onSubmit)} className="flex flex-col">
                    <FormInput
                        reactform={reactform}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder=" "
                        autoComplete="email"
                        spellCheck={false}
                        required
                        disabled={reactform.formState.isSubmitting}
                        aria-label='Enter your email'
                    />

                    <FormInput
                        reactform={reactform}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder=" "
                        autoComplete="current-password"
                        required
                        disabled={reactform.formState.isSubmitting}
                        aria-label='Enter your password'
                    />

                    <div className="-mt-4 flex justify-end">
                        <TextLink to={ROUTE_PATHS.FORGOT_PASSWORD} className="text-sm ml-0.5" aria-label="Navigate to forgot password page">
                            For<span className="font-mono text-sm">g</span>ot password ?
                        </TextLink>
                    </div>

                    <div className="cta-group relative">
                        <Button
                            type="submit"
                            className="mt-8 w-full font-mono font-semibold"
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
        </section >
    );
};