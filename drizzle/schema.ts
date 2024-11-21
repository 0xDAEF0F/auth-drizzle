import { pgTable, text, serial } from "drizzle-orm/pg-core";

export const usersTable = pgTable("user", {
  id: serial().primaryKey(),
  name: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export type UserPayload = Omit<
  typeof usersTable.$inferSelect,
  "password" | "name"
>;

export const booksTable = pgTable("book", {
  isbn: text().primaryKey(),
  title: text().notNull(),
  author: text().notNull(),
  genre: text().notNull(),
  publisher: text().notNull(),
});

export const messagesTable = pgTable("message", {
  id: serial().primaryKey(),
  content: text().notNull(),
});
