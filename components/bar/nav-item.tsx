"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
}

const NavItem = ({ href, label }: NavItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn("hover:text-brand", {
        "text-brand font-medium": pathname === href,
      })}
    >
      {label}
    </Link>
  );
};

export default NavItem;
