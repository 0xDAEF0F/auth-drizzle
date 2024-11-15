import { db } from "@/drizzle/db";
import { Books } from "./Books";

export default async function page() {
  const books = await db.query.booksTable.findMany({ limit: 20 });

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-3xl underline">Books</h1>
      <section className="flex flex-col gap-3">
        <Books books={books} />
      </section>
    </div>
  );
}
