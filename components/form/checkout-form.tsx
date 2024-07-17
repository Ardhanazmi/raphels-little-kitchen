"use client";

import useCart from "@/hooks/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays, format } from "date-fns";
import { id } from "date-fns/locale";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { User } from "@prisma/client";

const CheckoutSchema = z.object({
  name: z.string().min(1, "Nama perlu diisi"),
  phone: z.string().min(1, "Nomor telepon perlu diisi"),
  dateShipping: z.coerce
    .date()
    .min(
      addDays(new Date(), 1),
      "Tanggal pengiriman harus minimal 2 hari dari hari ini"
    ),
  address: z.string().min(1, "Alamat perlu diisi"),
  city: z.string().min(1, "Kota perlu diisi"),
  province: z.string().min(1, "Provinsi perlu diisi"),
  postalCode: z.string().min(1, "Kode pos perlu diisi"),
  note: z.string().optional(),
});

interface CheckoutFormProps {
  user: User;
}

const CheckoutForm = ({ user }: CheckoutFormProps) => {
  const cart = useCart();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const totalPrice = cart.items.reduce((total, item) => {
    return total + Number(item.price) * item.quantity;
  }, 0);

  const form = useForm<z.infer<typeof CheckoutSchema>>({
    resolver: zodResolver(CheckoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      dateShipping: undefined,
      address: "",
      city: "",
      province: "",
      postalCode: "",
      note: "",
    },
  });

  const handleCheckOut = async (values: z.infer<typeof CheckoutSchema>) => {
    if (!user) return router.push("/sign-in");

    setLoading(true);
    try {
      const products = cart.items.map((item) => item);
      const response = await axios.post("/api/midtrans/transaction", {
        ...values,
        products,
        totalPrice,
      });
      setToken(response.data.token);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      // @ts-expect-error
      window.snap.pay(token, {
        onSuccess: () => {
          router.push("/my-orders");
          toast.success("Pembayaran berhasil!");
          cart.removeAll();
        },
        onPending: () => {
          router.push("/my-orders");
          toast("Menunggu pembayaran...");
          cart.removeAll();
        },
        onError: () => {
          toast.error("Terjadi kesalahan!");
        },
        onClose: () => {
          router.push("/my-orders");
          toast.error("Pembayaran tertunda!");
          cart.removeAll();
        },
      });
    }
  }, [token, router]);

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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleCheckOut)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="John Doe"
                  className="border-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>No. Telepon</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="081234567890"
                    className="border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateShipping"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Pengiriman</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal border-black w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        format(field.value, "eeee, dd MMMM yyyy", {
                          locale: id,
                        })
                      ) : (
                        <span>Pilih Tanggal (min. 1 hari dari hari ini)</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) => date < addDays(new Date(), 1)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Jl. Ahmad Yani..."
                  className="border-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kota</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Jakarta"
                    className="border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Provinsi</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="DKI Jakarta"
                    className="border-black"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kode Pos</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="12345"
                  className="border-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan</FormLabel>
              <FormControl>
                <Textarea
                  disabled={loading}
                  placeholder="Tambahkan catatan (opsional)"
                  className="border-black"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="brand"
          type="submit"
          disabled={loading || cart.items.length === 0 || !user}
          className="w-full"
        >
          Pesan
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
