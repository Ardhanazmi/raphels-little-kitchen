import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET_KEY || "";

export async function POST(req: Request) {
  try {
    const payloadString = await req.text();
    const headerPayload = headers();

    const svixHeaders = {
      "svix-id": headerPayload.get("svix-id")!,
      "svix-timestamp": headerPayload.get("svix-timestamp")!,
      "svix-signature": headerPayload.get("svix-signature")!,
    };

    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;

    const eventType = evt.type;
    if (eventType === "user.created") {
      await db.user.create({
        data: {
          userId: evt.data.id,
          name: `${evt.data.first_name} ${evt.data.last_name}`,
          imageUrl: evt.data.image_url,
          email: evt.data.email_addresses[0].email_address,
        },
      });
    }
    return NextResponse.json({
      success: true,
      message: "Webhook received",
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
