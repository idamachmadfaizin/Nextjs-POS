import { LucideEgg } from "lucide-react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <LucideEgg className="size-4" />
          </div>
          {process.env.NEXT_PUBLIC_APP_NAME}.
        </div>
        {children}
      </div>
    </div>
  );
}
