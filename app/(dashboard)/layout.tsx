import { DashboardNav } from "@/components/dashboard/dashboard-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
