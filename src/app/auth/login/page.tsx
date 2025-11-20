import { Metadata } from "next";

import { LoginFormCard } from "./components/login-form-card";

export const metadata: Metadata = {
  title: `Login - ${process.env.NEXT_PUBLIC_APP_NAME}`,
};

export default function LoginPage() {
  return <LoginFormCard />;
}
