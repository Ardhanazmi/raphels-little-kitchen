"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUpload from "../file-upload";

import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const formScehema = z.object({
  name: z.string().min(1, { message: "Product harus diisi" }),
  image: z.string().min(1, { message: "Gambar harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi" }),
  price: z.coerce.number().min(1, { message: "Harga harus diisi" }),
});

const AddProductForm = () => {
  const router = useRouter();
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "addProduct";

  const form = useForm({
    resolver: zodResolver(formScehema),
    defaultValues: {
      name: "",
      image: "",
      description: "",
      price: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formScehema>) => {
    try {
      await axios.post("/api/product", values);
      form.reset();
      router.refresh();
      onClose();
      toast.success("Produk baru telah ditambahkan!");
    } catch (error) {
      toast.error("Terjadi kesalahan!");
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 overflow-hidden text-black bg-white">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-2xl font-bold">
            Tambah Produk Baru
          </DialogTitle>
          <DialogDescription>
            Masukkan data produk yang ingin ditambahkan
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="px-6 space-y-2">
              <div className="flex justify-start items-start">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih Gambar Produk</FormLabel>
                      <FormControl>
                        <FileUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Produk</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="contoh: Kue Kering"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1 w-full">
                    <FormLabel>Harga</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center">
                          Rp.
                        </p>
                        <Input
                          type="number"
                          className="pl-8"
                          placeholder="0"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isLoading}
                        placeholder="Buat deskripsi produk anda"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="px-6 pb-3 flex">
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Tambah
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductForm;
