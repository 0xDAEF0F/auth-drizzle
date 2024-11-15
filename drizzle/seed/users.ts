import { usersTable } from "../schema";
import { db } from "../db";
import { hashPassword } from "@/utils/password";
import { eq } from "drizzle-orm";

async function main() {
  // delete table
  await db.delete(usersTable);

  // prepare insertion
  const user: Omit<typeof usersTable.$inferInsert, "id"> = {
    name: "John",
    email: "a@a.com",
    password: await hashPassword("pass"),
  };

  // insert
  const [{ id }] = await db
    .insert(usersTable)
    .values(user)
    .returning({ id: usersTable.id });
  console.log(`New user created. ID: ${id}`);

  // retrieve
  const user_ = await db.query.usersTable.findFirst({
    where: eq(usersTable.id, id),
  });
  console.log("User: ", user_);

  // update
  await db
    .update(usersTable)
    .set({
      name: "Johnny",
    })
    .where(eq(usersTable.id, id));
  console.log("User info updated.");
}

main();
