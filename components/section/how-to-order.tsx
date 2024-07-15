import React from "react";
import OrderStep from "../order-step";

const HowToOrderSection = () => {
  return (
    <div className="pt-28 space-y-12">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-semibold">Cara Pemesanan</h2>
        <p className="text-muted-foreground lg:w-[45%] mx-auto">
          Pelajari cara pemesanan dengan aman dan nyaman dengan mengikuti
          petunjuk dibawah ini
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 justify-between gap-4">
        <OrderStep
          index={1}
          image="/choose-menu.svg"
          title="Pilih Menu"
          description="Pilih menu kue yang ingin anda pesan"
        />
        <OrderStep
          index={2}
          image="/checkout.svg"
          title="Pemesanan"
          description="Atur pemesanan seperti waktu dan tempat"
        />
        <OrderStep
          index={3}
          image="/pay.svg"
          title="Pembayaran"
          description="Pilih metode pembayaran sesuai keinginan anda"
        />
        <OrderStep
          index={4}
          image="/delivery.svg"
          title="Pesanan Siap"
          description="Anda dapat memilih metode pengiriman kue"
        />
      </div>
    </div>
  );
};

export default HowToOrderSection;
