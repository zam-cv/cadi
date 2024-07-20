import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { Input } from "@/components/ui/input";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrar estudiantes..."
          value={
            (table.getColumn("firstname")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("firstname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
