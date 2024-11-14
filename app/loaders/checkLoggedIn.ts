import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import { redirect } from "next/navigation";

export async function checkLoggedIn() {
  const jwt = (await cookies()).get("jwt")?.value;
  const payload = await decrypt(jwt);
  if (payload) redirect("/");
}
