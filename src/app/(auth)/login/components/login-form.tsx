"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import z from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { useAppForm } from "@/hooks/form";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { AppleButton } from "../../components/apple-button";
import { GoogleButton } from "../../components/google-button";

const formSchema = z.object({
  email: z.email(),
  password: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const callbackURL = searchParams.get("next") || "/";

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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                  <Link href="/sign-up">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
