//Column Header File

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./data-table-column-header";

import { statuses } from "../data/data";
import { Task } from "../data/schema";
import { Badge } from "@/components/ui/badge";

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

      if (statusValue === "Delivered") {
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
      } else if (statusValue === "Not Delivered") {
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
    accessorKey: "recipient",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recipient" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("recipient")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "quotation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-30 truncate sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("quotation")}
          </span>
        </div>
      );
    },
  },
];
