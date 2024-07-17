import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const { name, image, price, description } = await req.json();
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (user.role !== UserRole.ADMIN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        image,
        price,
        description,
      },
    });

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (user.role !== UserRole.ADMIN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
