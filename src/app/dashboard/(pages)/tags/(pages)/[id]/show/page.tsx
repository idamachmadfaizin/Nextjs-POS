"use client";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);

  return <p className="dashboard-main">Products detail page ID: "{id}"</p>;
}
