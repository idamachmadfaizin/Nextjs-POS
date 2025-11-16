"use client";

import { LucidePlus } from "lucide-react";

import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { ProductDataTable } from "./components/product-data-table";

import data from "./product-data.json";

export default function Page() {
  return (
    <div className="dashboard-main">
      <AppHeader heading="Products">
        <Button variant="outline" size="sm" title="New Product">
          <LucidePlus />
          <span className="hidden sm:inline">New Product</span>
        </Button>
      </AppHeader>

      <ProductDataTable data={data as never} />
    </div>
  );
}
