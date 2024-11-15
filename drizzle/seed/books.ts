import { booksTable } from "../schema";
import { db } from "../db";
import { faker } from "@faker-js/faker";

function createBook(): typeof booksTable.$inferInsert {
  return {
    isbn: faker.commerce.isbn(),
    title: faker.book.title(),
    author: faker.book.author(),
    genre: faker.book.genre(),
    publisher: faker.book.publisher(),
  };
}

async function main() {
  await db.delete(booksTable);

  const booksData = faker.helpers.multiple(createBook, { count: 200 });

  const books = await db
    .insert(booksTable)
    .values(booksData)
    .returning({ isbn: booksTable.isbn });

  books.forEach(({ isbn }) => console.log(`Book created. ISBN: ${isbn}`));
}

main();
