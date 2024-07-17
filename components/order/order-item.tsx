"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button, buttonVariants } from "../ui/button";
import OrderItemSkeleton from "./order-item-skeleton";

import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import type { Order } from "@prisma/client";
import { cn, formatPrice } from "@/lib/utils";
import { getOrderItems } from "@/actions/getOrders";
import { ArrowUpRight, Ban, CreditCard, ShoppingBag, View } from "lucide-react";
import { GetOrderItems } from "@/index";

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [orderItems, setOrderItems] = useState<GetOrderItems[] | null>(null);

  const subtotal = orderItems?.reduce((acc, item) => {
    return acc + Number(item.product.price) * item.quantity;
  }, 0);

  const onPay = () => {
    if (order.token) {
      // @ts-expect-error
      window.snap.pay(order.token, {
        onSuccess: () => {
          toast.success("Pembayaran berhasil!");
        },
        onPending: () => {
          toast("Menunggu pembayaran...");
        },
        onError: () => {
          toast.error("Terjadi kesalahan!");
        },
        onClose: () => {
          toast("Pembayaran tertunda.");
        },
      });
    }
  };

  const onCancel = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/midtrans/transaction/cancel`, {
        data: {
          orderId: order.id,
        },
      });
      router.push("/my-orders?status=CANCELED");
      toast.success("Pesanan dibatalkan.");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data);
      }
      toast.error("Terjadi kesalahan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getOrderItems(order.id);
        console.log(response);

        setOrderItems(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [order]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;
    scriptTag.setAttribute("data-client-key", process.env.MIDTRANS_CLIENT_KEY!);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <div className="h-full p-3 space-y-4 transition-all duration-300 border border-brand shadow-md sm:py-4 sm:px-6 hover:shadow-lg rounded-xl">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center">
          <ShoppingBag className="w-4 h-4 mr-2" aria-hidden="true" />
          <span>Pesanan</span>
        </h3>
        {order.status === "PENDING" ? (
          <Badge variant="pending" className="capitalize">
            Tertunda
          </Badge>
        ) : order.status === "PAID" ? (
          <Badge variant="success" className="capitalize">
            Berhasil
          </Badge>
        ) : (
          <Badge variant="destructive" className="capitalize">
            Dibatalkan
          </Badge>
        )}
      </div>
      <Separator className="mt-4 bg-brand" />
      <div>
        <ul>
          {!isLoading ? (
            orderItems?.map((item, i) => (
              <li key={i} className="flex py-3 border-b border-brand">
                <div className="relative w-20 h-20 overflow-hidden rounded-md sm:h-24 sm:w-24">
                  <Image
                    fill
                    src={item.product.image}
                    alt="fasfasd"
                    className="object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-3 flex-1 ml-4 sm:ml-6">
                  <div>
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <Link
                        href={`/xxxx/${item.productId}`}
                        className="font-semibold text-black sm:text-lg line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <div className="font-medium text-black sm:text-right">
                        {formatPrice(Number(item.product.price))}
                      </div>
                    </div>
                  </div>
                  <p>x{item.quantity}</p>
                </div>
              </li>
            ))
          ) : (
            <OrderItemSkeleton />
          )}
          <div>
            <div className="space-y-1">
              <div className="flex items-center justify-between font-semibold pt-3">
                <p className="mr-2">Subtotal :</p>
                <p className="text-right">{formatPrice(Number(subtotal))}</p>
              </div>
              <div className="flex items-center justify-between font-semibold">
                <p className="mr-2">Service (2%) :</p>
                <p className="text-right">
                  {formatPrice(Number(subtotal! * 0.02))}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="mr-2 font-bold sm:text-xl">Total Harga :</p>
              <p className="font-bold text-right">
                {formatPrice(Number(order.totalPrice))}
              </p>
            </div>
          </div>
        </ul>
        {order.status !== "CANCELED" && (
          <div className="flex flex-col space-y-6">
            <Separator className="bg-brand" />
            <div className="flex justify-end">
              {order.status === "PENDING" && (
                <div className="flex justify-end gap-3">
                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isLoading}
                    onClick={onCancel}
                    className="flex items-center gap-1 min-w-[100px]"
                  >
                    <Ban size={17} />
                    Batalkan
                  </Button>
                  <Button
                    size="sm"
                    variant="brand"
                    className="flex items-center gap-1 min-w-[100px]"
                    onClick={onPay}
                    disabled={isLoading}
                  >
                    <CreditCard size={17} />
                    Bayar
                  </Button>
                </div>
              )}
              {order.status === "PAID" && (
                <div className="flex justify-end">
                  <Link
                    href={`/my-orders/${order.id}`}
                    aria-disabled={isLoading}
                    className={cn(
                      buttonVariants({ variant: "brand" }),
                      "flex items-center gap-1 min-w-[100px]"
                    )}
                  >
                    Detail Pesanan
                    <ArrowUpRight size={17} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default OrderItem;
