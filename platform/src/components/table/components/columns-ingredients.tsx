import { ColumnDef } from "@tanstack/react-table";
import { Schema } from "../data/schema-ingredients";
import { DataTableColumnHeader } from "./data-table-column-header";

export const columns: ColumnDef<Schema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ingrediente" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cantidad" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("quantity")}
          </span>
        </div>
      );
    },
  },
];
