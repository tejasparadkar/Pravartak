//Column Header File

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Task } from "../data/schema";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-30 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("label")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusValue = row.getValue("status");

      if (statusValue === "Approved") {
        return (
          <div className="flex space-x-2">
            <div className="bg-green-100 px-2 py-1 rounded-md flex justify-center items-center space-x-4">
              <div className="bg-green-500 w-3 h-3 rounded-xl"></div>
              <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
                {statusValue}
              </span>
            </div>
          </div>
        );
      } else if (statusValue === "Processing") {
        return (
          <div className="flex space-x-2">
            <div className="bg-blue-100 px-2 py-1 rounded-md flex justify-center items-center space-x-4">
              <div className="bg-blue-500 w-3 h-3 rounded-xl"></div>
              <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
                {statusValue}
              </span>
            </div>
          </div>
        );
      } else if (statusValue === "Pending") {
        return (
          <div className="flex space-x-2">
            <div className="bg-yellow-100 px-2 py-1 rounded-md flex justify-center items-center space-x-4">
              <div className="bg-yellow-500 w-3 h-3 rounded-xl"></div>
              <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
                {statusValue}
              </span>
            </div>
          </div>
        );
      } else if (statusValue === "Completed") {
        return (
          <div className="flex space-x-2">
            <div className="bg-purple-100 px-2 py-1 rounded-md flex justify-center items-center space-x-4">
              <div className="bg-purple-500 w-3 h-3 rounded-xl"></div>
              <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
                {statusValue}
              </span>
            </div>
          </div>
        );
      }
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "delivery",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delivery" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("delivery")}
          </span>
        </div>
      );
    },
  },
];
