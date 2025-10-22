"use client";

import { PropsWithChildren } from "react";

type Props = {
  heading: string;
  subHeading?: string;
};

export function AppHeader({
  heading,
  subHeading,
  children,
}: PropsWithChildren<Props>) {
  return (
    <header className="flex gap-4 flex-row items-center justify-between mb-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {heading}
        </h1>
        {subHeading && <p className="mt-2 max-w-2xl text-lg">{subHeading}</p>}
      </div>

      <div className="flex shrink-0 items-center gap-3">{children}</div>
    </header>
  );
}
