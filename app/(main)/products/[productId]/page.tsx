import Image from "next/image";
import { getProductDetail } from "@/actions/getProducts";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Action from "./action";
import { getCurrentUser } from "@/lib/get-current-user";

const productDetailPage = async ({
  params,
}: {
  params: { productId: string };
}) => {
  const user = await getCurrentUser();
  const product = await getProductDetail(params.productId);

  return (
    <div className="flex-1 space-y-7 container pt-6 pb-24">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-full md:max-w-6xl">
        <div className="grid gap-4 md:gap-10 items-start">
          <Image
            src={product?.image as string}
            alt="Product Image"
            width={600}
            height={600}
            className="aspect-[1/1] object-cover border w-full rounded-lg overflow-hidden"
          />
        </div>
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{product?.name}</h1>
            <div>
              <p className="text-2xl font-bold">
                {formatPrice(Number(product?.price))}
              </p>
            </div>
            <div>
              <p>{product?.description}</p>
            </div>
          </div>
          <Action product={product!} user={user!} />
        </div>
      </div>
    </div>
  );
};

export default productDetailPage;
