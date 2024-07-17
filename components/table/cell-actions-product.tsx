"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductsColumn } from "./ProductTable";

import axios from "axios";
import toast from "react-hot-toast";
import { useModal } from "@/hooks/use-modal";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface CellActionsProps {
  data: ProductsColumn;
}

const CellActionsProduct: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();
  const { onOpen } = useModal();
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/product/${data.id}`);
      toast.success("Produk telah di hapus.");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={loading}>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="-mt-2">
        <DropdownMenuItem
          className="hover:cursor-pointer"
          onClick={() => onOpen("editProduct", { product: data })}
        >
          <Edit size={15} className="mr-1" />
          Ubah
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onConfirm} className="hover:cursor-pointer">
          <Trash size={15} className="mr-1" />
          Hapus
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionsProduct;
