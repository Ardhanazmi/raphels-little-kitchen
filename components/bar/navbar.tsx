import Link from "next/link";
import { getCurrentUser } from "@/lib/get-current-user";
import { UserButton } from "@clerk/nextjs";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import NavItem from "./nav-item";
import { Sidebar } from "./sidebar";
import { UserRole } from "@prisma/client";
import CartButton from "../cart-button";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () => {
  const clerkUser = await currentUser();
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-brand-secondary">
      <nav className="container flex items-center justify-between">
        <div>
          <h1 className="font-medium text-lg md:text-xl text-brand">
            <Link href="/">Raphels Little Kitchen</Link>
          </h1>
        </div>
        <ul className="lg:flex items-center space-x-12 hidden">
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
            <NavItem href="/#location" label="Location" />
          </li>
          {user?.role === UserRole.ADMIN ? (
            <li>
              <NavItem href="/dashboard" label="Dashboard" />
            </li>
          ) : (
            <li>
              <NavItem href="/my-orders" label="My Orders" />
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <CartButton />
          <Sidebar />
          <div className="hidden lg:flex">
            {clerkUser ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                className={cn(buttonVariants({ variant: "brand" }), "px-7")}
                href="/sign-in"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
