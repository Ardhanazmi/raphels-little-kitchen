"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavItemProps {
  href: string;
  label: string;
}

const MainNavItem = ({ href, label }: MainNavItemProps) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        pathname === href
          ? " text-black transition-colors"
          : "text-muted-foreground",
        "text-sm font-medium"
      )}
    >
      {label}
    </Link>
  );
};

export default MainNavItem;
