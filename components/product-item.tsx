"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Product } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";
import Link from "next/link";

interface ProductItemProps {
  product: Product;
}

export default function ProductItem({ product }: ProductItemProps) {
  const { addItem } = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    addItem(product);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="w-full h-40 lg:h-64 object-cover"
        />
      </Link>
      <div className="p-4 bg-background">
        <h3 className="md:text-xl font-semibold line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1 lg:line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="md:text-lg font-semibold">
            {formatPrice(Number(product.price))}
          </span>
          <Button
            size="icon"
            variant="brand"
            className="rounded-full"
            onClick={onAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
