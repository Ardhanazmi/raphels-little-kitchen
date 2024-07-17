import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";
import { buttonVariants } from "../ui/button";
import MainNavItem from "./main-nav-item";
import { UserButton } from "@clerk/nextjs";

export function DashboardNav() {
  return (
    <header className="sticky top-0 z-50 w-full py-4 border-b">
      <nav className="container flex items-center justify-between">
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "icon" }),
              "rounded-full h-8 w-8"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </Link>
          <MainNavItem href="/dashboard" label="Overview" />
          <MainNavItem href="/dashboard/products" label="Produk" />
          <MainNavItem href="/dashboard/orders" label="Pesanan" />
        </div>
        <UserButton />
      </nav>
    </header>
  );
}
