"use server";

import { SignupFormSchema, FormState } from "@/utils/definitions";
import { db } from "@/drizzle/db";
import { usersTable } from "@/drizzle/schema";

export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await db.insert(usersTable).values(validatedFields.data).returning({
      id: usersTable.id,
      email: usersTable.email,
    });
  } catch {
    return {
      message: "Could not create user.",
    };
  }
}
