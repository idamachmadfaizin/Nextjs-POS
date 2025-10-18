"use client";

import Link from "next/link";

export default function Page() {
  return (
    <div className="dashboard-main">
      <p>Products page</p>
      <Link href="/products/cuk-ki">Detail</Link>
    </div>
  );
}
