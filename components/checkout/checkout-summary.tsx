"use client";

import { useState } from "react";
import useCart from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Info } from "lucide-react";

const CheckoutSummary = () => {
  const cart = useCart();
  const serviceRate = 0.02;

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity * (1 + serviceRate);
  }, 0);

  return (
    <div className="px-4 p-6 bg-brand border text-white border-black rounded-lg sm:p-6 lg:col-span-5 lg:p-8 ">
      <h3 className="text-lg font-medium">Pembelian</h3>
      <div className="mt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p>{formatPrice(totalPrice)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Service (2%)</p>
            <p>{formatPrice(totalPrice * serviceRate)}</p>
          </div>
        </div>
        <div className="flex items-center font-medium justify-between pt-4 border-t border-white">
          <p>Total</p>
          <p>{formatPrice(totalPrice)}</p>
        </div>
      </div>
      <div className="text-[11px] mt-6 italic">
        *Total harga belum termasuk biaya pengiriman. Pengiriman hanya via ojek
        online di tanggung pembeli.
      </div>
    </div>
  );
};

export default CheckoutSummary;
