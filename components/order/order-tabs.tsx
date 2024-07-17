"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";

const OrderTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");

  const tabs = [
    {
      title: "Semua",
      href: `/my-orders`,
      isActive: status === null,
    },
    {
      title: "Tertunda",
      href: `/my-orders?status=PENDING`,
      isActive: status === "PENDING",
    },
    {
      title: "Berhasil",
      href: `/my-orders?status=PAID`,
      isActive: status === "PAID",
    },
    {
      title: "Gagal",
      href: `/my-orders?status=CANCELED`,
      isActive: status === "CANCELED",
    },
  ];

  return (
    <Tabs
      defaultValue={tabs.find((tab) => tab.isActive)?.href ?? tabs[0]?.href}
      className="sticky top-0 z-30 w-full px-1 overflow-auto bg-transparent"
      onValueChange={(value) => router.push(value)}
    >
      <TabsList className="inline-flex w-full items-center justify-between space-x-1.5 text-muted-foreground">
        {tabs.map((tab) => (
          <div
            role="none"
            key={tab.href}
            className={cn(
              "w-full border-b-2 border-transparent py-1.5",
              tab.isActive && "border-brand"
            )}
          >
            <TabsTrigger
              value={tab.href}
              className={cn(
                "w-full inline-flex items-center justify-center rounded-sm px-3 py-1.5 text-xs md:text-sm font-medium text-muted-foreground ring-offset-background transition-all hover:bg-brand hover:text-brand-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                tab.isActive && "text-brand"
              )}
            >
              {tab.title}
            </TabsTrigger>
          </div>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  );
};

export default OrderTabs;
