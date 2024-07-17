"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";

import CellActionsOrder from "./cell-actions-order";
import { cn, formatPrice } from "@/lib/utils";

export type OrdersColumn = {
  id: string;
  name: string;
  totalQuantity: number;
  dateShipping: string;
  totalPrice: number;
  status: string;
  createdAt: string;
};

interface OrderTableProps {
  orderData: OrdersColumn[];
}

export default function OrderTable({ orderData }: OrderTableProps) {
  const columns: ColumnDef<OrdersColumn>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <p>{row.original.id}</p>,
    },
    {
      accessorKey: "name",
      header: "Pembeli",
      cell: ({ row }) => <p>{row.original.name}</p>,
    },
    {
      accessorKey: "totalQuantity",
      header: "Jumlah",
      cell: ({ row }) => <p>{row.original.totalQuantity}</p>,
    },
    {
      accessorKey: "totalPrice",
      header: "Total Harga",
      cell: ({ row }) => <p>{formatPrice(row.original.totalPrice)}</p>,
    },
    {
      accessorKey: "createdAt",
      header: "Pemesanan",
      cell: ({ row }) => <p>{row.original.createdAt}</p>,
    },
    {
      accessorKey: "dateShipping",
      header: "Pengiriman",
      cell: ({ row }) => <p>{row.original.dateShipping}</p>,
    },
    {
      accessorKey: "order",
      header: "Status Pembelian",
      cell: ({ row }) => (
        <span
          className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full text-white",
            row.original.status === "PENDING" && "bg-yellow-500",
            row.original.status === "PAID" && "bg-green-500",
            row.original.status === "CANCELED" && "bg-red-500"
          )}
        >
          {row.original.status === "PENDING" && "Tertunda"}
          {row.original.status === "PAID" && "Sukses"}
          {row.original.status === "CANCELED" && "Batal"}
        </span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionsOrder data={row.original} />,
    },
  ];

  return <DataTable columns={columns} data={orderData} />;
}
