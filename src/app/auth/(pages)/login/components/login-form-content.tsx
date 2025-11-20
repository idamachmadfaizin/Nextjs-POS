import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import z from "zod";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";

import { AppleButton } from "../../../components/apple-button";
import { GoogleButton } from "../../../components/google-button";
import { authClient } from "../../../lib/auth-client";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginFormContent() {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("next") || "/dashboard";

  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const form = useAppForm({
    defaultValues: {
      email: "",
      password: "",
    } as FormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setErrors([]);

      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          callbackURL: callbackURL,
        },
        {
          onError: (context) => {
            const message = context.error.message || "Failed to sign in";
            setErrors([{ message }]);
          },
        },
      );
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <Field>
          <AppleButton>Login with Apple</AppleButton>
          <GoogleButton>Login with Google</GoogleButton>
        </Field>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
          Or continue with
        </FieldSeparator>

        <form.AppField
          name="email"
          children={(field) => (
            <field.TextField
              label="Email"
              placeholder="me@example.com"
              autoComplete="off"
              required
            />
          )}
        />

        <form.AppField
          name="password"
          children={(field) => (
            <Field>
              <field.PasswordField label="Password" required />
              <Link
                href="#"
                className="ml-auto block w-fit! text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </Field>
          )}
        />

        <Field>
          <FieldError errors={errors} />
          <form.AppForm>
            <form.SubscribeButton label="Login" />
          </form.AppForm>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
