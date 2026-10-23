import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@ui/Button";
import { Form, FormLabel } from "@ui/Form/Form";
import { FormInput } from "@ui/Form/FormInput";
import { Icon } from "@ui/Icon";
import { IconButton } from "@ui/IconButton";

import { ROUTE_PATHS } from "@/router/route.constants";
import { TextLink } from "@ui/TextLink";
import { Badge } from "@ui/Badge";
import React from "react";
import type { CompleteSignupValues } from "./CompleteSignup.types";

export const CompleteSignup = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarError, setAvatarError] = useState("");

    const reactform = useForm<CompleteSignupValues>({
        defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            avatar: null,
        },
        mode: "onTouched",
        reValidateMode: "onChange",
    });

    const isSubmitting = reactform.formState.isSubmitting;
    const arrowState = isSubmitting ? 'launch' : reactform.formState.isValid ? 'on' : 'idle';

    const handleAvatarChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setAvatarError("Please select a valid image.");
            reactform.setValue("avatar", null);
            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setAvatarError("Image must be 5 MB or smaller.");
            reactform.setValue("avatar", null);
            event.target.value = "";
            return;
        }

        setAvatarError("");

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === "string") {
                setAvatarPreview(reader.result);
            }
        };

        reader.onerror = () => {
            setAvatarError("Unable to load this image. Please try again.");
        };

        reader.readAsDataURL(file);
    };

    const onSubmit = async (values: CompleteSignupValues) => {
        const profileDetails = {
            username: values.username.trim().replace(/^@/, ""),
            firstName: values.firstName.trim(),
            lastName: values.lastName.trim(),
            avatar: avatarPreview,
        };

        console.info("Complete signup details:", profileDetails);

        navigate(ROUTE_PATHS.VERIFY_EMAIL, { replace: true });
    };

    return (
        <section className="w-full max-w-110">
            <header className="mb-9 relative">
                <div className="mb-4">
                    <Icon name="shards" className="h-16 w-24 absolute sm:-top-10 sm:left-48 -top-11 left-41" aria-hidden="true" />
                </div>

                <h1 className="font-mono font-bold text-[28px] leading-7 text-foreground sm:text-[32px] sm:leading-10 uppercase">
                    Almost there
                </h1>

                <p className="mt-2 leading-7 text-muted-foreground font-medium">
                    Already on XPire ?{" "}
                    <TextLink to={ROUTE_PATHS.LOGIN} aria-label="Navigate to login page">
                        Si<span className="font-mono">g</span>n In
                    </TextLink>
                </p>
            </header>

            <Form {...reactform}>
                <form
                    noValidate
                    onSubmit={reactform.handleSubmit(onSubmit)}
                    className="space-y-3">
                    <div>
                        <FormLabel className="ml-0.5 flex items-center">
                            <span className="font-mono text-sm">Profile Photo</span>
                            <Badge variant='secondary'>
                                Optional
                            </Badge>
                        </FormLabel>

                        <div className="flex-center sm:gap-8 gap-6 py-2">
                            <div
                                className={`relative flex-center h-24 w-24 shrink-0 ${avatarPreview
                                    ? ""
                                    : "rounded-full border-2 border-dashed border-border bg-muted/30 text-muted-foreground"
                                    }`}
                                aria-label={avatarPreview ? "Profile photo preview" : "No profile photo selected"}>
                                {avatarPreview ? (
                                    <React.Fragment>
                                        <img
                                            src={avatarPreview}
                                            alt="Profile preview"
                                            className="block h-full w-full rounded-full object-cover"
                                        />
                                        <IconButton
                                            icon="close"
                                            size="sm"
                                            aria-label="Remove profile photo"
                                            disabled={isSubmitting}
                                            onClick={() => {
                                                setAvatarPreview(null);
                                                reactform.setValue("avatar", null);

                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = "";
                                                }
                                            }}
                                            className="absolute -right-1.5 -top-0.5 border-2 border-card bg-destructive text-white hover:bg-destructive-soft hover:text-destructive 
                                            focus:ring-2 focus:ring-destructive focus:ring-offset-2 transform transition duration-300"
                                        />
                                    </React.Fragment>
                                ) : (
                                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                        <Icon name="avatar" aria-hidden="true" className="h-10 w-12" />
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1 mb-4">
                                <FormInput
                                    reactform={reactform}
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    inputRef={fileInputRef}
                                    onChange={handleAvatarChange}
                                    className="sr-only"
                                    aria-label="Choose profile photo"
                                    disabled={isSubmitting}
                                />

                                {!avatarPreview ?
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-auto py-0"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isSubmitting}
                                        startAdornment={<Icon name="add" aria-hidden="true" />}>
                                        Add photo
                                    </Button> :
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-auto py-0"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isSubmitting}
                                        startAdornment={<Icon name="update" aria-hidden="true" />}>
                                        Replace photo
                                    </Button>
                                }

                                <p className="mt-2 ml-0.5 text-muted-foreground text-sm pointer-events-none">
                                    JPG , PNG or WEBP. Max 5 MB.
                                </p>
                            </div>
                        </div>

                        {avatarError && (
                            <p role="alert" className="mt-2 text-sm text-destructive">
                                {avatarError}
                            </p>
                        )}
                    </div>

                    <div className="mb-2">
                        <FormInput
                            reactform={reactform}
                            name="username"
                            type="text"
                            label="Username"
                            placeholder=" "
                            autoComplete="off"
                            autoCapitalize="none"
                            spellCheck={false}
                            required
                            disabled={isSubmitting}
                            description="Choose a unique username"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <FormInput
                            reactform={reactform}
                            name="firstName"
                            type="text"
                            label="First name"
                            placeholder=" "
                            autoComplete="given-name"
                            required
                            disabled={isSubmitting}
                        />

                        <FormInput
                            reactform={reactform}
                            name="lastName"
                            type="text"
                            label="Last name"
                            placeholder=" "
                            autoComplete="family-name"
                            required
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="cta-group relative">
                        <Button
                            type="submit"
                            className="w-full font-mono font-semibold"
                            isLoading={reactform.formState.isSubmitting}
                            disabled={reactform.formState.isSubmitting || !reactform.formState.isValid}>
                            {reactform.formState.isSubmitting ? null : "Submit"}
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
