import Link from "next/link";
import ProductItem from "../product-item";
import { ChevronRight } from "lucide-react";
import getProductsHome from "@/actions/getProducts";

const MenuSection = async () => {
  const products = await getProductsHome();

  return (
    <div id="menu" className="pt-28 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Menu Kami</h2>
        <p className="text-muted-foreground lg:w-[45%] mx-auto">
          Kami menyediakan berbagai macam kue mulai dari dessert, kue ulang
          tahun, bolu, kue kering, dll.
        </p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-end">
          <Link
            href="/products"
            className="flex items-center gap-1 text-brand hover:translate-x-2 transition-all"
          >
            Lihat Semua
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2 mx-1 mb-10 md:grid-cols-3 xl:gap-2 2xl:gap-5 xl:grid-cols-4 3xl:grid-cols-5">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
