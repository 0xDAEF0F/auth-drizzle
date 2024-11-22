import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "../lib/session";
import { z } from "zod";

const userSchema = z.object({
  id: z.number().min(1),
  email: z.string().email(),
});

export async function getUser() {
  const jwt = (await cookies()).get("jwt")?.value;
  const payload = await decrypt(jwt);

  if (!jwt || !payload) redirect("/login");

  return userSchema.parse(payload);
}
