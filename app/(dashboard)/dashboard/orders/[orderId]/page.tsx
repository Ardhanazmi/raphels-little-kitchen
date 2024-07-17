import Image from "next/image";
import { getOrderDetailDashboard } from "@/actions/getOrdersDashboard";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

const DashboardOrderDetailPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const order = await getOrderDetailDashboard(params.orderId);

  const subtotal = order?.orderItems.reduce((acc, item) => {
    return acc + Number(item.product.price) * item.quantity;
  }, 0);

  return (
    <div className="flex-1 space-y-7 container py-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Detail Pesanan</h2>
        <p className="text-muted-foreground">{params.orderId}</p>
      </div>
      <div className="flex flex-col xl:flex-row xl:justify-between gap-4">
        <div className="flex flex-col gap-3 xl:min-w-[800px]">
          <h3 className="text-lg font-medium">Informasi Produk</h3>
          <div className="flex flex-col space-y-4">
            {order?.orderItems.map((item) => (
              <div className="flex gap-4" key={item.id}>
                <div className="w-28 h-28 relative rounded-md overflow-hidden">
                  <Image src={item.product.image} alt="Hero Image" fill />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      x{item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {formatPrice(item.product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="space-y-7">
            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Subtotal</p>
                <p>{formatPrice(subtotal!)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Service (2%)</p>
                <p>{formatPrice(subtotal! * 0.02)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <p>Total</p>
              <p>{formatPrice(Number(order?.totalPrice))}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Informasi Pembeli</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>{order?.name}</p>
              <p>{order?.phone}</p>
              <p>{`${order?.address}, ${order?.city}, ${order?.province}`}</p>
              <p>{order?.postalCode}</p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-medium">Catatan Pesanan</h3>
            <p className="text-sm">
              {order?.note ? order.note : "Tidak ada catatan"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOrderDetailPage;
