import { db } from "@/drizzle/db";
import { Messages } from "./Messages";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function page() {
  return (
    <Suspense fallback={<p>messages...</p>}>
      <MessageWrapper />
    </Suspense>
  );
}

async function MessageWrapper() {
  await new Promise((res) => setTimeout(res, 2000));
  const messages = await db.query.messagesTable.findMany();

  return <Messages messages={messages} />;
}
