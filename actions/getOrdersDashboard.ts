import { db } from "@/lib/db";
import { format } from "date-fns";
import { OrdersColumn } from "@/components/table/OrderTable";
import { getCurrentUser } from "@/lib/get-current-user";
import { OrderDetail } from "..";

export default async function getOrdersDashboard() {
  const user = await getCurrentUser();

  if (user?.role !== "ADMIN") return [];

  try {
    const orders = await db.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        totalQuantity: true,
        dateShipping: true,
        totalPrice: true,
        status: true,
        createdAt: true,
      },
    });

    const formattedOrders: OrdersColumn[] = orders.map((order) => ({
      id: order.id,
      name: order.name,
      totalQuantity: order.totalQuantity,
      dateShipping: format(order.dateShipping, "dd/MM/yyyy"),
      totalPrice: Number(order.totalPrice),
      status: order.status,
      createdAt: format(order.createdAt, "dd/MM/yyyy"),
    }));

    return formattedOrders;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getOrderDetailDashboard(
  orderId: string
): Promise<OrderDetail | null> {
  const user = await getCurrentUser();

  if (user?.role !== "ADMIN") return null;

  try {
    const order = await db.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
                price: true,
              },
            },
          },
        },
      },
    });

    return order as OrderDetail | null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
