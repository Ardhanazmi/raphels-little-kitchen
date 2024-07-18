import { DashboardNav } from "@/components/dashboard/dashboard-nav";
import { getCurrentUser } from "@/lib/get-current-user";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();

  if (user?.role !== UserRole.ADMIN) redirect("/");

  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
