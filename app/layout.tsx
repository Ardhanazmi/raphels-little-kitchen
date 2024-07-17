import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "@/components/modal-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://raphels-littlekitchen.vercel.app"),
  title: {
    default: "Raphels Little Kitchen",
    template: `%s - Raphels Little Kitchen`,
  },
  description:
    "Raphels Little Kitchen menyediakan berbagai macam kue lezat yang dibuat dengan bahan-bahan berkualitas tinggi. Pesan kue favorit Anda secara online dan nikmati kelezatan yang tak tertandingi.",
  icons: "/assets/brand-logo.svg",
  keywords: [
    "Kitchen",
    "Online Shop",
    "Cake House",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Prisma",
    "PostgreSQL",
    "Cake",
    "Web Application",
    "Online Shop Application",
    "Custom Cakes",
    "Birthday Cakes",
    "Wedding Cakes",
    "Desserts",
    "Bakery",
    "Homemade Cakes",
    "Cake Delivery",
    "Online Bakery",
    "Artisan Cakes",
  ],
  authors: [
    {
      name: "Ardhan Azhra Azmi",
      url: "https://github.com/ArdhanAzhraAzmi",
    },
  ],
  creator: "Ardhan Azhra Azmi",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://raphels-littlekitchen.vercel.app",
    title: "Raphels Little Kitchen",
    description:
      "Nikmati berbagai macam kue lezat dari Raphels Little Kitchen. Pesan kue favorit Anda secara online dan dapatkan pengalaman kuliner yang tak terlupakan.",
    siteName: "Raphels Little Kitchen",
  },
};

const font = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ModalProvider />
          <Toaster position="bottom-center" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
