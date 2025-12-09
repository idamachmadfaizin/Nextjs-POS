import { LucidePlus } from "lucide-react";

import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";

import { TagDataTable } from "./components/tag-data-table";
import { gql, GraphQLClient } from "graphql-request";
import { headers } from "next/headers";

const document = gql`
  {
    tags {
      id
      name
    }
  }
`;

export default async function Page() {
  const gql = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
    headers: await headers()
  });
  gql.request(document).then(res => console.log(res))

  return (
    <div className="dashboard-main">
      <AppHeader heading="Tags">
        <Button variant="outline" size="sm" title="New Tag">
          <LucidePlus />
          <span className="hidden sm:inline">New Tag</span>
        </Button>
      </AppHeader>

      <TagDataTable />
    </div>
  );
}
