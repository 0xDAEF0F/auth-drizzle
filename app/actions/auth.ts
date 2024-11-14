"use server";

import { SignupFormSchema, FormState } from "@/utils/definitions";
import { db } from "@/drizzle/db";
import { UserPayload, usersTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { createSession } from "../lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function register(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  let user: UserPayload | undefined;
  try {
    const [user_] = await db
      .insert(usersTable)
      .values(validatedFields.data)
      .returning({
        id: usersTable.id,
        email: usersTable.email,
      });
    if (user_) user = user_;
  } catch (e) {
    if (
      e instanceof Error &&
      "code" in e &&
      e.code === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return {
        message: "User already exists.",
      };
    }
    return {
      message: "Internal error. Try again.",
    };
  }

  if (!user) return { message: "Internal error. Try again." };

  await createSession({ id: user.id, email: user.email });

  redirect("/");
}

type Res = {
  formState: {
    email: string;
    password: string;
  };
  errors: {
    email?: string[];
    password?: string[];
    root?: string;
  };
};

export async function login(
  state: FormState,
  formData: FormData,
): Promise<Res> {
  const form = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const validatedFields = SignupFormSchema.safeParse(form);

  if (!validatedFields.success) {
    return {
      formState: form,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, validatedFields.data.email),
  });

  if (!user)
    return { formState: form, errors: { root: "User does not exists." } };

  if (user.password !== validatedFields.data.password)
    return { formState: form, errors: { root: "Incorrect password" } };

  await createSession({ id: user.id, email: user.email });

  redirect("/");
}

export async function logout() {
  (await cookies()).delete("jwt");
  redirect("/login");
}
