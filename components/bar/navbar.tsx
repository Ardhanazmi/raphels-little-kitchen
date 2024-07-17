import { getCurrentUser } from "@/lib/get-current-user";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import NavItem from "./nav-item";
import { Sidebar } from "./sidebar";
import { UserRole } from "@prisma/client";
import CartButton from "../cart-button";

const Navbar = async () => {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-brand-secondary">
      <nav className="container flex items-center justify-between">
        <div>
          <h1 className="font-medium text-lg md:text-xl text-brand">
            Raphels Little Kitchen
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
          {user?.role === UserRole.ADMIN && (
            <li>
              <NavItem href="/dashboard" label="Dashboard" />
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-2 lg:space-x-4">
          <CartButton />
          <Sidebar />
          <div className="hidden lg:flex">
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "px-7 bg-brand"
                )}
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
