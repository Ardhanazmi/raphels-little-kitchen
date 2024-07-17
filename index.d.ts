import { Order } from "@prisma/client";

type OrderItem = {
  id: string;
  quantity: number;
  createdAt: Date;
  orderId: string;
  productId: string;
  product: {
    name: string;
    image: string;
    price: Decimal;
  };
};

export type OrderDetail = Order & {
  orderItems: OrderItem[];
};

export interface GetOrderItems extends OrderItem {
  product: Product;
}
