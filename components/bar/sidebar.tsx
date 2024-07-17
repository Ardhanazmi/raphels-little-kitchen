import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu4Line } from "react-icons/ri";
import NavItem from "./nav-item";
import { getCurrentUser } from "@/lib/get-current-user";
import UserAvatar from "../user-avatar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserRole } from "@prisma/client";

export async function Sidebar() {
  const user = await getCurrentUser();

  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon">
          <RiMenu4Line className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-brand-secondary" side="left">
        <SheetHeader className="text-left">
          <SheetTitle className="text-brand">Raphels Little Kitchen</SheetTitle>
          <SheetDescription>Homemade Cake & Bakery</SheetDescription>
        </SheetHeader>
        <div className="mt-10">
          <ul className="flex flex-col space-y-4">
            <li>
              <NavItem href="/" label="Home" />
            </li>
            <li>
              <NavItem href="/#order" label="order" />
            </li>
            <li>
              <NavItem href="/#menu" label="Menu" />
            </li>
            <li>
              <NavItem href="/#location" label="Lokasi" />
            </li>
            {user?.role === UserRole.ADMIN && (
              <li>
                <NavItem href="/dashboard" label="Dashboard" />
              </li>
            )}
            <li>
              {user ? (
                <UserAvatar src={user?.imageUrl} name={user?.name} />
              ) : (
                <Link
                  href="/sign-in"
                  className={cn(buttonVariants({ variant: "brand" }), "flex")}
                >
                  Masuk
                </Link>
              )}
            </li>
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
