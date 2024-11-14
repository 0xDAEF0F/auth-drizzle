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
