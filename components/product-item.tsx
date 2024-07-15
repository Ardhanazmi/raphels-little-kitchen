"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function ProductItem() {
  return (
    <Card className="w-full max-w-md overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <Image
        src="https://images.unsplash.com/photo-1622621746668-59fb299bc4d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGNha2V8ZW58MHx8MHx8fDA%3D"
        alt="Cake"
        width={500}
        height={500}
        className="w-full h-40 lg:h-64 object-cover"
      />
      <div className="p-4 bg-background">
        <h3 className="md:text-xl font-semibold line-clamp-2">
          Chocolate Fudge Cake
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1 lg:line-clamp-2">
          Indulge in the rich, decadent flavors of our homemade chocolate fudge
          cake.
        </p>
        <div className="flex items-center justify-between">
          <span className="md:text-lg font-semibold">$29.99</span>
          <Button size="icon" variant="brand" className="rounded-full">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
