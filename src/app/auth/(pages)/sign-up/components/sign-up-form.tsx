"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
import { cn } from "@/lib/utils";

import { AppleButton } from "../../../components/apple-button";
import { GoogleButton } from "../../../components/google-button";
import { authClient } from "../../../lib/auth-client";

const formSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const form = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    } as FormValues,
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      setErrors([]);
      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            router.replace("/dashboard");
          },
          onError: (context) => {
            const message = context.error.message || "Something went wrong.";
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
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Signup with your Apple or Google account
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
                <AppleButton>Signup with Apple</AppleButton>
                <GoogleButton>Signup with Google</GoogleButton>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Or continue with
              </FieldSeparator>

              <form.AppField
                name="name"
                children={(field) => (
                  <field.TextField
                    label="Full Name"
                    placeholder="John Doe"
                    autoComplete="off"
                    required
                  />
                )}
              />

              <form.AppField
                name="email"
                children={(field) => (
                  <field.EmailField
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
                  <field.PasswordField
                    label="Password"
                    description={
                      <FieldDescription>
                        Make sure your password is correct
                      </FieldDescription>
                    }
                    required
                  />
                )}
              />

              <Field>
                <FieldError errors={errors} />
                <form.AppForm>
                  <form.SubscribeButton label="Create Account" />
                </form.AppForm>
                <FieldDescription className="text-center">
                  Already have an account?{" "}
                  <Link href="/auth/login">Sign in</Link>
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
