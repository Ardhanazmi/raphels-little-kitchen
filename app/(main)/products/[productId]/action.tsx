"use client";

import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { Product, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import toast from "react-hot-toast";

interface ActionProps {
  product: Product;
  user: User;
}

const Action = ({ product, user }: ActionProps) => {
  const { addItem, removeAll } = useCart();
  const router = useRouter();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    addItem(product);
  };

  const handleCheckOut = async () => {
    if (!user) {
      return router.push("/sign-in");
    }
    try {
      removeAll();
      addItem(product);
      router.push(`/checkout`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="grid gap-2">
      <Button variant="brand" className="w-full" onClick={onAddToCart}>
        Tambah ke Keranjang
      </Button>
      <Button
        onClick={handleCheckOut}
        variant="outline"
        className="w-full border-brand bg-brand-secondary hover:bg-brand-secondary/70"
      >
        Beli Langsung
      </Button>
    </div>
  );
};

export default Action;
