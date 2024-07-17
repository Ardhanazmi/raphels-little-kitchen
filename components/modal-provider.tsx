"use client";

import { useEffect, useState } from "react";
import AddProductForm from "./form/add-product-form";
import EditProductForm from "./form/edit-product-form";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AddProductForm />
      <EditProductForm />
    </>
  );
};
