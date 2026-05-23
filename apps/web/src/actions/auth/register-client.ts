"use server";

import { redirect } from "next/navigation";

import {
  AUTH_MUTATION_ERROR_CODES,
  registerClientSchema,
  USER_ROLE,
  type MutationResult,
} from "@pulse/domain";

import { signIn } from "@/auth";
import { registerClientUser } from "@/data/auth/register-client.server";
import { MESSAGES } from "@/lib/messages";
import { getRoleHome } from "@pulse/policy-edge";

export type RegisterClientFormState = MutationResult | null;

export async function registerClientAction(
  _prevState: RegisterClientFormState,
  formData: FormData,
): Promise<RegisterClientFormState> {
  const acceptedTerms = formData.get("acceptedTerms") === "on";
  if (!acceptedTerms) {
    return {
      ok: false,
      code: AUTH_MUTATION_ERROR_CODES.TERMS_REQUIRED,
      message: MESSAGES.auth.register.termsRequired,
    };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (password !== confirmPassword) {
    return {
      ok: false,
      code: AUTH_MUTATION_ERROR_CODES.PASSWORD_MISMATCH,
      message: MESSAGES.auth.register.passwordMismatch,
    };
  }

  const parsed = registerClientSchema.safeParse({ email, password, fullName });
  if (!parsed.success) {
    return {
      ok: false,
      code: AUTH_MUTATION_ERROR_CODES.VALIDATION,
      message: MESSAGES.auth.register.validationError,
    };
  }

  const result = await registerClientUser(parsed.data);
  if (!result.ok) {
    if (result.code === AUTH_MUTATION_ERROR_CODES.DUPLICATE_EMAIL) {
      return {
        ok: false,
        code: AUTH_MUTATION_ERROR_CODES.DUPLICATE_EMAIL,
        message: MESSAGES.auth.register.duplicateEmail,
      };
    }

    return {
      ok: false,
      code: result.code,
      message: MESSAGES.auth.register.validationError,
    };
  }

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirect: false,
  });

  redirect(getRoleHome(USER_ROLE.CLIENT));
}
