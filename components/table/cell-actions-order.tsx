"use client";

import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrdersColumn } from "./OrderTable";

import { ArrowUpRight, MoreHorizontal } from "lucide-react";

interface CellActionsProps {
  data: OrdersColumn;
}

const CellActionsOrder: React.FC<CellActionsProps> = ({ data }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => router.push(`/dashboard/orders/${data.id}`)}
          className="hover:cursor-pointer"
        >
          Detail Pesanan
          <ArrowUpRight size={12} className="ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CellActionsOrder;
