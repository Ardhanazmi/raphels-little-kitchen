"use server";

import { db } from "@/lib/db";
import { GetOrderItems } from "..";

export const getOrderItems = async (
  orderId: string
): Promise<GetOrderItems[] | null> => {
  const orderItems = await db.orderItem.findMany({
    where: {
      orderId,
    },
    include: {
      product: true,
    },
  });

  return orderItems;
};
