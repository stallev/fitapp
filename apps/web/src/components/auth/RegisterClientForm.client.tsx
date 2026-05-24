"use client";

import { useActionState, useEffect, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AUTH_MUTATION_ERROR_CODES } from "@pulse/domain";

import { AlertText, ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { ChoiceCard } from "@/components/ui/ChoiceCard";
import { CustomLink } from "@/components/ui/CustomLink";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  registerClientAction,
  type RegisterClientFormState,
} from "@/actions/auth/register-client";
import { MESSAGES } from "@/lib/messages";
import { PRODUCT_TOAST_DURATION_MS } from "@/lib/ui/product-toast";

export const RegisterClientForm = () => {
  const router = useRouter();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [state, formAction, pending] = useActionState<
    RegisterClientFormState,
    FormData
  >(registerClientAction, null);

  const emailError =
    state && !state.ok && state.code === AUTH_MUTATION_ERROR_CODES.DUPLICATE_EMAIL
      ? state.message
      : undefined;

  useEffect(() => {
    if (state && !state.ok && state.message) {
      toast.error(state.message, { duration: PRODUCT_TOAST_DURATION_MS });
    }
  }, [state]);

  return (
    <form action={formAction} className="space-y-6" aria-busy={pending}>
      <input
        type="hidden"
        name="acceptedTerms"
        value={termsAccepted ? "on" : ""}
      />
      <div className="grid gap-3">
        <ChoiceCard
          selected
          title={MESSAGES.auth.register.clientTileTitle}
          meta={MESSAGES.auth.register.clientTileDescription}
          trailing="🧍"
          disabled
          aria-pressed
        />
        <ChoiceCard
          title={MESSAGES.auth.register.trainerTileTitle}
          meta={MESSAGES.auth.register.trainerTileDescription}
          trailing="🏋"
          onClick={() => router.push("/auth/register/trainer")}
        />
      </div>

      {state && !state.ok && state.message && state.code !== AUTH_MUTATION_ERROR_CODES.DUPLICATE_EMAIL ? (
        <AlertText>{state.message}</AlertText>
      ) : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="fullName">
            {MESSAGES.auth.register.fullNameLabel}
          </FieldLabel>
          <Input
            id="fullName"
            name="fullName"
            autoComplete="name"
            required
            disabled={pending}
          />
        </Field>

        <Field data-invalid={emailError ? true : undefined}>
          <FieldLabel htmlFor="email">
            {MESSAGES.auth.register.emailLabel}
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={pending}
            aria-invalid={emailError ? true : undefined}
          />
          {emailError ? <FieldError>{emailError}</FieldError> : null}
        </Field>

        <Field>
          <FieldLabel htmlFor="password">
            {MESSAGES.auth.register.passwordLabel}
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            disabled={pending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword">
            {MESSAGES.auth.register.confirmPasswordLabel}
          </FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            disabled={pending}
          />
        </Field>

        <Field orientation="horizontal">
          <Checkbox
            id="acceptedTerms"
            checked={termsAccepted}
            onCheckedChange={(value) => setTermsAccepted(value === true)}
            disabled={pending}
          />
          <FieldLabel htmlFor="acceptedTerms" className="font-normal">
            {MESSAGES.auth.register.termsLabel}
          </FieldLabel>
        </Field>
      </FieldGroup>

      <Button
        type="submit"
        className="h-12 w-full"
        disabled={pending}
        aria-busy={pending}
      >
        {pending ? (
          <>
            <Loader2Icon className="size-4 animate-spin" aria-hidden />
            {MESSAGES.auth.register.submitting}
          </>
        ) : (
          MESSAGES.auth.register.submit
        )}
      </Button>

      <ContentText variant="small" className="text-center">
        {MESSAGES.auth.register.hasAccount}{" "}
        <CustomLink href="/auth/login">
          {MESSAGES.auth.register.loginLink}
        </CustomLink>
      </ContentText>
    </form>
  );
};
