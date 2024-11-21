import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("user", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export type UserPayload = Omit<
  typeof usersTable.$inferSelect,
  "password" | "name"
>;

export const booksTable = sqliteTable("book", {
  isbn: text().primaryKey(),
  title: text().notNull(),
  author: text().notNull(),
  genre: text().notNull(),
  publisher: text().notNull(),
});

export const messagesTable = sqliteTable("message", {
  id: int().primaryKey({ autoIncrement: true }),
  content: text().notNull(),
});
