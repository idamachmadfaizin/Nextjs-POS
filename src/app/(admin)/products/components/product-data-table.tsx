import {
  DataTable,
  DataTableColumnCellActions,
  DataTableColumnCellCurrency,
  DataTableColumnHeader,
  DataTablePagination,
} from "@/components/ui/data-table";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import z from "zod";

const schema = z.object({
  id: z.string(),
  category: z.string(),
  name: z.string(),
  sku: z.string(),
  stock: z.number(),
  unit: z.string(),
  initialPrice: z.number(),
  sellingPrice: z.number(),
  netProfit: z.number(),
});

const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const currencyCell: ColumnDef<Product>["cell"] = (props) => {
  return (
    <div className="text-right">
      {formatter.format(props.row.original.initialPrice)}
    </div>
  );
};

type Product = z.infer<typeof schema>;

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "sku",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="SKU" />
    ),
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock" />
    ),
  },
  {
    accessorKey: "unit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Unit" />
    ),
  },
  {
    accessorKey: "initialPrice",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Initial Price"
        align="right"
      />
    ),
    cell: (props) => (
      <DataTableColumnCellCurrency value={props.row.original.initialPrice} />
    ),
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Selling Price"
        align="right"
      />
    ),
    cell: (props) => (
      <DataTableColumnCellCurrency value={props.row.original.sellingPrice} />
    ),
  },
  {
    accessorKey: "netProfit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Net Profit" align="right" />
    ),
    cell: (props) => (
      <DataTableColumnCellCurrency value={props.row.original.netProfit} />
    ),
  },
  {
    accessorKey: "actions",
    header: "",
    cell: () => <DataTableColumnCellActions />,
  },
];

type Props = {
  data?: Product[];
};
export function ProductDataTable({ data }: Props) {
  const table = useReactTable({
    data: data ?? [],
    columns,
    initialState: {
      columnPinning: {
        left: ["actions"],
        right: [],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return <DataTable table={table} />;
}
