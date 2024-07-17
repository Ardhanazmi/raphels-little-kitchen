import { db } from "@/lib/db";
import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;

  if (!webhookSecret) {
    throw new Error("Webhook secret not set in .env");
  }

  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;

    if (evt.type === "user.created") {
      await db.user.create({
        data: {
          userId: evt.data.id,
          email: evt.data.email_addresses[0].email_address,
          name: `${evt.data.first_name} ${
            evt.data.last_name && evt.data.last_name
          }`,
          imageUrl: evt.data.image_url,
        },
      });
    }

    console.log("Webhook received", evt.data);

    return NextResponse.json({
      message: "Webhook received",
    });
  } catch (err: any) {
    return NextResponse.json({
      message: err.message,
    });
  }
}
