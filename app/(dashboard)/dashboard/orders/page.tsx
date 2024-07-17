import getOrdersDashboard from "@/actions/getOrdersDashboard";
import getProductsDashboard from "@/actions/getProductsDashboard";
import OrderTable from "@/components/table/OrderTable";

const DashboardOrderPage = async () => {
  const orders = await getOrdersDashboard();

  return (
    <div className="flex-1 space-y-4 container py-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Pesanan</h2>
        <p className="text-muted-foreground">Semua list daftar pesanan</p>
      </div>
      <OrderTable orderData={orders} />
    </div>
  );
};

export default DashboardOrderPage;
