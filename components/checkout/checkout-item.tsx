"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import useCart from "@/hooks/use-cart";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { MinusIcon, PlusIcon, Trash } from "lucide-react";

interface CheckoutItemProps {
  product: Product & { quantity: number };
}

const CheckoutItem = ({ product }: CheckoutItemProps) => {
  const { removeItem, updateItemQuantity } = useCart();

  const incrementQuantity = () => {
    updateItemQuantity(product.id, product.quantity + 1);
  };

  const decrementQuantity = () => {
    if (product.quantity > 1) {
      updateItemQuantity(product.id, product.quantity - 1);
    }
  };

  return (
    <li className="flex gap-4">
      <div className="relative w-24 h-24 overflow-hidden rounded-md sm:w-28 sm:h-28">
        <Image
          fill
          src={product.image}
          alt={product.name}
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <p className="font-semibold">{product.name}</p>
          <p className="text-sm font-medium">
            {formatPrice(Number(product.price) * product.quantity)}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant="brand"
              onClick={decrementQuantity}
              size="icon"
              className="h-7 w-7"
            >
              <MinusIcon className="w-3 h-3" />
            </Button>
            <span className="min-w-7 h-7 flex items-center justify-center text-sm font-medium border-brand border rounded-md">
              {product.quantity}
            </span>
            <Button
              variant="brand"
              onClick={incrementQuantity}
              size="icon"
              className="h-7 w-7"
            >
              <PlusIcon className="w-3 h-3" />
            </Button>
          </div>
          <div>
            <Button
              variant="destructive"
              size="icon"
              className="h-7 w-7"
              onClick={() => removeItem(product.id)}
            >
              <Trash className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CheckoutItem;
