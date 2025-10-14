import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kntl Inc",
  description: "Keep never tired learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
