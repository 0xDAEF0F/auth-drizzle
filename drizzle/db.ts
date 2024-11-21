import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

export const client = postgres(process.env.POSTGRES_URL!, {
  prepare: false,
  ssl: "require",
});

const db = drizzle({
  client,
  schema,
  logger: process.env.NODE_ENV !== "production",
});

export { db };
