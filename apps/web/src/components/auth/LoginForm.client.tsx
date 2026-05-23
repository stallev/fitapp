"use client";

import { useActionState } from "react";
import { Loader2Icon } from "lucide-react";

import { AlertText, ContentText } from "@/components/atoms";
import { Button } from "@/components/ui/button";
import { CustomLink } from "@/components/ui/CustomLink";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  loginAction,
  type LoginFormState,
} from "@/actions/auth/login";
import { MESSAGES } from "@/lib/messages";

type LoginFormProps = {
  callbackUrl?: string;
};

export const LoginForm = ({ callbackUrl }: LoginFormProps) => {
  const [state, formAction, pending] = useActionState<
    LoginFormState,
    FormData
  >(loginAction, null);

  return (
    <form action={formAction} className="space-y-4" aria-busy={pending}>
      {callbackUrl ? (
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
      ) : null}

      {state && !state.ok && state.message ? (
        <AlertText>{state.message}</AlertText>
      ) : null}

      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">{MESSAGES.auth.login.emailLabel}</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={pending}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">
            {MESSAGES.auth.login.passwordLabel}
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={pending}
          />
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
            {MESSAGES.auth.login.submitting}
          </>
        ) : (
          MESSAGES.auth.login.submit
        )}
      </Button>

      <ContentText variant="small" className="text-center">
        {MESSAGES.auth.login.noAccount}{" "}
        <CustomLink href="/auth/register">
          {MESSAGES.auth.login.registerLink}
        </CustomLink>
      </ContentText>
    </form>
  );
};
