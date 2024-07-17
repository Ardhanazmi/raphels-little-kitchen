import CheckoutBag from "@/components/checkout/checkout-bag";
import CheckoutSummary from "@/components/checkout/checkout-summary";
import CheckoutForm from "@/components/form/checkout-form";
import { getCurrentUser } from "@/lib/get-current-user";

const CheckoutPage = async () => {
  const user = await getCurrentUser();

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          Isi semua data alamat pengiriman dengan benar.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-2">
          <CheckoutForm user={user!} />
        </div>
        <div className="order-1 lg:order-2 flex flex-col gap-4 lg:col-span-1">
          <CheckoutBag />
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
