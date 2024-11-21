import { db } from "@/drizzle/db";
import { Messages } from "./Messages";

export default async function page() {
  const messages = await db.query.messagesTable.findMany();

  return <Messages messages={messages} />;
}
