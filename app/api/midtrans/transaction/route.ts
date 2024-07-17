const orderId = require("order-id")("key");
const midtransClient = require("midtrans-client");

import * as z from "zod";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new Response("Akses tidak diizinkan!", { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      phone,
      dateShipping,
      address,
      city,
      province,
      postalCode,
      note,
      totalPrice,
      products,
    } = body;

    if (!name) {
      return new Response("Nama dibutuhkan!", { status: 400 });
    }

    if (!phone) {
      return new Response("Nomor telepon dibutuhkan!", { status: 400 });
    }

    if (!dateShipping) {
      return new Response("Tanggal pengiriman dibutuhkan!", { status: 400 });
    }

    if (!address) {
      return new Response("Alamat dibutuhkan!", { status: 400 });
    }

    if (!city) {
      return new Response("Kota dibutuhkan!", { status: 400 });
    }

    if (!province) {
      return new Response("Provinsi dibutuhkan!", { status: 400 });
    }

    if (!postalCode) {
      return new Response("Kode pos dibutuhkan!", { status: 400 });
    }

    if (!products || products.length === 0) {
      return new Response("Tidak ada produk yang dibeli!", { status: 400 });
    }

    if (!totalPrice) {
      return new Response("Total harga dibutuhkan!", { status: 400 });
    }

    const order_id = orderId.generate();
    const order_items_id = `${orderId.generate()}`;

    let snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
      clientKey: process.env.MIDTRANS_CLIENT_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id,
        gross_amount: Number(totalPrice),
      },
      credit_card: {
        secure: true,
      },
      item_details: products.map((product: any) => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: product.quantity,
      })),
      customer_details: {
        first_name: name,
        email: user.email,
      },
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/my-orders`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/my-orders`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/my-orders`,
      },
    };

    const transaction = await snap.createTransaction(parameter);

    const totalQuantity = products.reduce(
      (acc: number, product: any) => acc + product.quantity,
      0
    );

    await db.order.create({
      data: {
        id: order_id,
        userId: user?.id,
        name,
        phone,
        dateShipping,
        address,
        city,
        province,
        postalCode,
        note,
        totalQuantity,
        totalPrice: Number(totalPrice),
        status: "PENDING",
        token: transaction.token,
        orderItems: {
          create: products.map((product: any) => ({
            id: order_items_id,
            product: {
              connect: {
                id: product.id,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Data permintaan yang diteruskan tidak valid", {
        status: 422,
      });
    }

    return new Response("Tidak dapat membuat transaksi, coba lagi", {
      status: 500,
    });
  }
}
