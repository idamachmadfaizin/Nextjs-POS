"use client";

import {
  DataTable,
  DataTableColumnCellActions,
  DataTableColumnHeader,
} from "@/components/ui/data-table";
import { gqlClient } from "@/lib/graphql";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { gql } from "graphql-request";
import { useEffect, useState } from "react";
import z from "zod";

const schema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: Date,
  updatedAt: Date,
  deletedAt: Date,
});

type Tag = z.infer<typeof schema>;

export const columns: ColumnDef<Tag>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    enableHiding: false,
    cell: (props) => (
      <DataTableColumnCellActions
        onView={() => console.log("onView", props.row.original)}
        onEdit={() => console.log("onEdit", props.row.original)}
        onDelete={() => console.log("onDelete", props.row.original)}
      />
    ),
    size: 30,
  },
];

const document = gql`
  {
    tags {
      id
      name
    }
  }
`;

export function TagDataTable() {
  const [data, setData] = useState<Tag[]>([]);

  useEffect(() => {
    console.log("tags onload");
    gqlClient.request(document).then((res) => setData(res.tags));
  }, []);

  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      columnPinning: {
        left: [],
        right: ["actions"],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable table={table} />;
}
