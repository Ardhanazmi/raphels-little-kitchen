"use client";
import * as React from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import CellActionsProduct from "./cell-actions-product";

import axios from "axios";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";
import Image from "next/image";

export type ProductsColumn = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
};

interface ProductTableProps {
  productData: ProductsColumn[];
}

export default function ProductTable({ productData }: ProductTableProps) {
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const router = useRouter();

  const columns: ColumnDef<ProductsColumn>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRowIds((prev) =>
              prev.length === productData.length
                ? []
                : productData.map((row) => row.id)
            );
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedRowIds((prev) =>
              value
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: "Produk",
    },
    {
      accessorKey: "description",
      header: "Deskripsi",
      cell: ({ row }) => (
        <p className="line-clamp-1 w-60">{row.original.description}</p>
      ),
    },
    {
      accessorKey: "price",
      header: "Harga",
      cell: ({ row }) => <p>{formatPrice(Number(row.original.price))}</p>,
    },
    {
      accessorKey: "image",
      header: "Gambar",
      cell: ({ row }) => (
        <Image
          src={row.original.image}
          alt="product image"
          width={50}
          height={50}
          className="rounded-md"
        />
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Dibuat Pada",
    },
    {
      id: "actions",
      cell: ({ row }) => <CellActionsProduct data={row.original} />,
    },
  ];

  async function deleteProduct(productId: string) {
    try {
      await axios.delete(`/api/product/${productId}`);
      router.refresh();
      toast.success("Product has been deleted.");
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }

  const handleDeleteSelected = async () => {
    await Promise.all(selectedRowIds.map((id) => deleteProduct(id)));
    setSelectedRowIds([]);
  };

  return (
    <DataTable
      columns={columns}
      data={productData}
      deleteRowsAction={() => void handleDeleteSelected()}
    />
  );
}
