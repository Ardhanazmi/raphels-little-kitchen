"use client";

import { useTransition } from "react";
import { Input } from "../ui/input";
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useModal } from "@/hooks/use-modal";

interface DataTableHeaderProps {
  table: any;
  deleteRowAction: any;
  searchKey: string;
}

const DataTableHeader = ({
  table,
  deleteRowAction,
  searchKey,
}: DataTableHeaderProps) => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center py-4">
        <Input
          placeholder={
            pathname === "/dashboard/products"
              ? "Cari nama produk..."
              : "Cari order id..."
          }
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="flex md:w-[300px]"
        />
      </div>
      {deleteRowAction && table.getSelectedRowModel().rows.length > 0 ? (
        <Button
          size="sm"
          onClick={(e) => {
            startTransition(() => {
              table.toggleAllPageRowsSelected(false);
              deleteRowAction(e);
            });
          }}
          disabled={isPending}
          variant="destructive"
        >
          <Trash size={16} className="mr-1" />
          Hapus
        </Button>
      ) : pathname === "/dashboard/products" ? (
        <Button size="sm" onClick={() => onOpen("addProduct", {})}>
          <PlusCircle size={16} className="mr-1" />
          Tambah Produk
        </Button>
      ) : null}
    </div>
  );
};

export default DataTableHeader;
