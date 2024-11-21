"use server";

import { db } from "@/drizzle/db";
import { messagesTable } from "@/drizzle/schema";
import { revalidatePath } from "next/cache";

export async function sendMessage(text: string) {
  try {
    await db.insert(messagesTable).values({ content: text });
  } catch (e) {
    console.error(e);
  } finally {
    revalidatePath("/messages");
  }
}
