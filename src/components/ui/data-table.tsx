"use client";

import { Column, flexRender, Table } from "@tanstack/react-table";
import {
  LucideArrowDown,
  LucideArrowUp,
  LucideChevronDown,
  LucideChevronLeft,
  LucideChevronRight,
  LucideChevronsLeft,
  LucideChevronsRight,
  LucideChevronsUpDown,
  LucideColumns2,
  LucideEye,
  LucideEyeOff,
  LucideMoreHorizontal,
  LucidePencil,
  LucideTrash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table as UiTable,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DataTableProps<TData> = {
  table: Table<TData>;
};

export function DataTable<TData>({ table }: DataTableProps<TData>) {
  return (
    <div>
      <DataTableActions table={table} />

      <div className="-mt-2">
        <div className="overflow-hidden rounded-md border">
          <UiTable>
            <TableHeader className="bg-muted">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </UiTable>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}

type DataTablePaginationProps<TData> = {
  table: Table<TData>;
};

type DataTableActionsProps<TData> = {
  table: Table<TData>;
};

export function DataTableActions<TData>({
  table,
}: DataTableActionsProps<TData>) {
  return (
    <div className="flex items-center justify-end gap-2 rounded-t-sm border border-b-0 px-5 pt-2 pb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <LucideColumns2 />

            <span className="hidden sm:inline">Columns</span>
            <LucideChevronDown className="hidden sm:inline" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide(),
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {/* <div className="text-muted-foreground flex-1 text-sm">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Page size:</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 50, 100].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <LucideChevronsLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <LucideChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <LucideChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <LucideChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  align?: "left" | "center" | "right";
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  align,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  const isSorted = column.getIsSorted();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          className={cn(
            "flex items-center gap-2",
            {
              "justify-end": align === "right",
              "justify-center": align === "center",
            },
            className,
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className={cn({
              "-ml-3": align === undefined || align === "left",
              "-mr-3": align === "right",
            })}
            onClick={() => column.toggleSorting()}
          >
            <span>{title}</span>
            {isSorted === "asc" ? (
              <LucideArrowUp />
            ) : isSorted === "desc" ? (
              <LucideArrowDown />
            ) : (
              <LucideChevronsUpDown />
            )}
          </Button>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {["desc", false].includes(isSorted) && (
          <ContextMenuItem onClick={() => column.toggleSorting(false)}>
            <LucideArrowUp />
            Asc
          </ContextMenuItem>
        )}

        {["asc", false].includes(isSorted) && (
          <ContextMenuItem onClick={() => column.toggleSorting(true)}>
            <LucideArrowDown />
            Desc
          </ContextMenuItem>
        )}

        {isSorted !== false && (
          <ContextMenuItem onClick={() => column.clearSorting()}>
            <LucideChevronsUpDown />
            Clear
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => column.toggleVisibility(false)}>
          <LucideEyeOff />
          Hide
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

type DataTableColumnCellCurrencyProps = {
  value: Parameters<Intl.NumberFormat["format"]>[0];
  locales?: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
  className?: string;
};

export function DataTableColumnCellCurrency({
  value,
  locales,
  options,
  className,
}: DataTableColumnCellCurrencyProps) {
  locales ??= "id-ID";
  options ??= {
    style: "currency",
    currency: "IDR",
  };

  const formatter = new Intl.NumberFormat(locales, options);

  return (
    <div className={cn("text-right", className)}>{formatter.format(value)}</div>
  );
}

type DataTableColumnCellActionsProps = {
  disableView?: boolean;
  disableEdit?: boolean;
  disableDelete?: boolean;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function DataTableColumnCellActions({
  disableView,
  disableEdit,
  disableDelete,
  onView,
  onEdit,
  onDelete,
}: DataTableColumnCellActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <LucideMoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!disableView && (
          <DropdownMenuItem onClick={onView}>
            <LucideEye />
            View
          </DropdownMenuItem>
        )}
        {!disableEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <LucidePencil />
            Edit
          </DropdownMenuItem>
        )}
        {!disableDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} variant="destructive">
              <LucideTrash2 />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
