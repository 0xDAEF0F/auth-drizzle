"use client";

import { messagesTable } from "@/drizzle/schema";
import { useOptimistic } from "react";
import { sendMessage } from "./sendMessage.action";
import { cn } from "clsx-for-tailwind";

type Message = typeof messagesTable.$inferSelect;

type Props = {
  messages: Message[];
};

export function Messages({ messages }: Props) {
  const [optimisticMsgs, addOptimisticMsg] = useOptimistic<
    (Message & { pending?: boolean })[],
    string
  >(messages, (state, optimisticValue) => [
    ...state,
    {
      content: optimisticValue,
      id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
      pending: true,
    },
  ]);

  const handleMessage = async (formData: FormData) => {
    const msg = formData.get("message") as string;
    addOptimisticMsg(msg);
    await sendMessage(msg);
  };

  return (
    <div>
      <h1>Messages</h1>
      {optimisticMsgs.map((msg) => (
        <p className={cn([msg.pending && "text-red-500"])} key={msg.id}>
          {msg.content}
        </p>
      ))}
      <form action={handleMessage}>
        <input type="text" name="message" />
        <button type="submit">Send message</button>
      </form>
    </div>
  );
}
