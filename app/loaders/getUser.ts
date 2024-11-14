import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt } from "../lib/session";
import { UserPayload } from "@/drizzle/schema";
import { JWTPayload } from "jose";

export async function getUser() {
  const jwt = (await cookies()).get("jwt")?.value;
  const payload = await decrypt(jwt);

  if (!jwt || !payload) redirect("/login");

  return payload as JWTPayload & UserPayload;
}
