import { db } from "@/drizzle/db";
import { booksTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: Props) {
  const bookId = (await params).id;
  const book = await db.query.booksTable.findFirst({
    where: eq(booksTable.isbn, bookId),
  });
  return <div>{JSON.stringify(book)}</div>;
}
