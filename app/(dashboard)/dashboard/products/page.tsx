import getProductsDashboard from "@/actions/getProductsDashboard";
import ProductTable from "@/components/table/ProductTable";

const DashboardProductPage = async () => {
  const products = await getProductsDashboard();

  return (
    <div className="flex-1 space-y-4 container py-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Produk</h2>
        <p className="text-muted-foreground">Semua list daftar produk</p>
      </div>
      <ProductTable productData={products} />
    </div>
  );
};

export default DashboardProductPage;
