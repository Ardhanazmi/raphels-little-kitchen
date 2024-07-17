import { getProducts } from "@/actions/getProducts";
import ProductItem from "@/components/product-item";
import React from "react";

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="container pt-10 space-y-8 min-h-[100vh]">
      <div>
        <h1 className="text-3xl font-bold">Semua Produk</h1>
        <p className="text-muted-foreground">
          Anda dapat memilih semua kue yang tersedia di sini
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 mx-1 mb-10 md:grid-cols-3 xl:gap-2 2xl:gap-5 xl:grid-cols-4 3xl:grid-cols-5">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
