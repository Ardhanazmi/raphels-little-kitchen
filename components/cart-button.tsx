"use client";

import { ShoppingBagIcon, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineShopping } from "react-icons/ai";

import useCart from "@/hooks/use-cart";
import { Button } from "./ui/button";

const CartButton = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const router = useRouter();
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={() => router.push("/checkout")}
      className="relative hover:text-brand"
      aria-label={`${cart.items.length}-items-in-cart`}
    >
      <AiOutlineShopping className="w-6 h-6 md:w-7 md:h-7" />
      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 px-1.5 py-0.5 rounded-full bg-brand text-[10px] font-medium text-background">
        {cart.items.length}
      </span>
    </button>
  );
};

export default CartButton;
