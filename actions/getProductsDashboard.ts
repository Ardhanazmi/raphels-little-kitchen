import { db } from "@/lib/db";
import { format } from "date-fns";
import { getCurrentUser } from "@/lib/get-current-user";
import { ProductsColumn } from "@/components/table/ProductTable";

export default async function getProductsDashboard() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      return [];
    }

    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const formatedProducts: ProductsColumn[] = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      image: product.image,
      createdAt: format(product.createdAt, "dd/MM/yyyy"),
    }));

    return formatedProducts;
  } catch (error) {
    console.log(error);
    return [];
  }
}
