import { db } from "@/drizzle/db";
import { messagesTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const message = url.searchParams.get("message") || "stub";

  await db.insert(messagesTable).values({ content: message });

  return NextResponse.json({ success: true });
}
