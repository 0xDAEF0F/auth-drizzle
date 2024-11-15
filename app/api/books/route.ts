import { db } from "@/drizzle/db";
import { booksTable } from "@/drizzle/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const endpointSchema = z.object({
  limit: z.coerce.number().min(1).max(20),
  offset: z.coerce.number().min(0),
});

export type GetBooksRes =
  | {
      success: true;
      data: (typeof booksTable.$inferSelect)[];
    }
  | {
      success: false;

      error: { limit?: string[]; offset?: string[] };
    };

export async function GET(request: Request) {
  const url = new URL(request.url);

  const limit = url.searchParams.get("limit") || "1";
  const offset = url.searchParams.get("offset") || "0";

  const maybeParsed = endpointSchema.safeParse({ limit, offset });

  if (!maybeParsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: maybeParsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const books = await db.query.booksTable.findMany({
    limit: maybeParsed.data.limit,
    offset: maybeParsed.data.offset,
  });

  return NextResponse.json({ success: true, data: books });
}
