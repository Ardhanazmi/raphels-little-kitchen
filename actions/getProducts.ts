import { db } from "@/lib/db";

export default async function getProductsHome() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
    });

    return products;
  } catch (error) {
    return [];
  }
}

export async function getProducts() {
  try {
    const products = await db.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return products;
  } catch (error) {
    return [];
  }
}
