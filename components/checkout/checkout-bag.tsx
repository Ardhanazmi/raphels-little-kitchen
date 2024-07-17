"use client";

import useCart from "@/hooks/use-cart";
import CheckoutItem from "./checkout-item";
import { useEffect, useState } from "react";

const CheckoutBag = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="lg:col-span-7 px-4 p-6 bg-brand-secondary border border-black rounded-lg sm:p-6 lg:p-8">
      {cart.items.length > 0 ? (
        <ul className="space-y-7">
          {cart.items.map((item) => (
            <CheckoutItem key={item.id} product={item} />
          ))}
        </ul>
      ) : (
        <p className="text-center">Your cart is empty</p>
      )}
    </div>
  );
};

export default CheckoutBag;
