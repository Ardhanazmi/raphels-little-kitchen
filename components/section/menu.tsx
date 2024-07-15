import React from "react";
import ProductItem from "../product-item";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const MenuSection = () => {
  return (
    <div className="pt-28 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Menu Kami</h2>
        <p className="text-muted-foreground lg:w-[45%] mx-auto">
          Kami menyediakan berbagai macam kue mulai dari dessert, kue ulang
          tahun, bolu, kue kering, dll.
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2 justify-end">
          <Link href="" className="font-medium text-brand">
            Lihat Semua
          </Link>
          <ChevronRight className="h-4 w-4 text-brand" />
        </div>
        <div className="grid grid-cols-2 gap-2 mx-1 mb-10 md:grid-cols-3 xl:gap-2 2xl:gap-5 xl:grid-cols-4 3xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
