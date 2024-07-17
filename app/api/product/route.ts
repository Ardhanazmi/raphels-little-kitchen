import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, image, price, description } = await req.json();
  const user = await getCurrentUser();

  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (user.role !== UserRole.ADMIN) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await db.product.create({
      data: {
        name,
        image,
        price,
        description,
      },
    });

    return NextResponse.json({ message: "Product created successfully" });
  } catch (error) {
    return NextResponse.json(error);
  }
}
