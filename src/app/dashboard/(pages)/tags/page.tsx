import { LucidePlus } from "lucide-react";

import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";

import { TagDataTable } from "./components/tag-data-table";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="dashboard-main">
      <AppHeader heading="Tags">
        <Button variant="outline" size="sm" title="New Tag" asChild>
          <Link href="/dashboard/tags/create">
            <LucidePlus />
            <span className="hidden sm:inline">New Tag</span>
          </Link>
        </Button>
      </AppHeader>

      <TagDataTable />
    </div>
  );
}
