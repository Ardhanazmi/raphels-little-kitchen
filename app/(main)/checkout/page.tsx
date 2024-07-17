import CheckoutBag from "@/components/checkout/checkout-bag";
import CheckoutSummary from "@/components/checkout/checkout-summary";
import CheckoutForm from "@/components/form/checkout-form";
import { Separator } from "@/components/ui/separator";

const CheckoutPage = () => {
  return (
    <div className="container pt-10 space-y-8 min-h-[100vh]">
      <div>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-muted-foreground">
          Isi semua data alamat pengiriman dengan benar.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2">
          <CheckoutForm />
        </div>
        <div className="flex col-span-1 flex-col gap-4">
          <CheckoutSummary />
          <Separator className="bg-black" />
          <CheckoutBag />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
