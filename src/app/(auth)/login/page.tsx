import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Login - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function LoginPage() {
  return <LoginForm />;
}
