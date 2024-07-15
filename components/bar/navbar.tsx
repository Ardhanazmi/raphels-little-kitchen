import { getCurrentUser } from "@/lib/get-current-user";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import NavItem from "./nav-item";
import { Sidebar } from "./sidebar";
import { UserRole } from "@prisma/client";

const Navbar = async () => {
  const user = await getCurrentUser();

  console.log(user);

  return (
    <header className="sticky top-0 z-50 w-full py-4 bg-brand-secondary">
      <nav className="container flex items-center justify-between">
        <div>
          <h1 className="font-medium text-xl text-brand">
            Raphels Little Kitchen
          </h1>
        </div>
        <ul className="lg:flex items-center space-x-12 font-light hidden">
          <li>
            <NavItem href="/" label="Home" />
          </li>
          <li>
            <NavItem href="/order" label="order" />
          </li>
          <li>
            <Link href="/menu">Menu</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          {user?.role === UserRole.ADMIN && (
            <li>
              <NavItem href="/dashboard" label="Dashboard" />
            </li>
          )}
        </ul>
        <div>
          <Sidebar />
          <div className="hidden lg:block">
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
