"use client";

import { messagesTable } from "@/drizzle/schema";
import { useOptimistic, useRef } from "react";
import { sendMessage } from "./sendMessage.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = typeof messagesTable.$inferSelect;

type Props = {
  messages: Message[];
};

export function Messages({ messages }: Props) {
  const inputRef = useRef<HTMLFormElement | null>(null);
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
    inputRef.current?.reset();
    await sendMessage(msg);
  };

  return (
    <div className="space-y-2 px-3">
      <h1 className="text-2xl">Messages</h1>
      <div>
        {optimisticMsgs.map((msg) => (
          <p key={msg.id}>
            {msg.content} {msg.pending && <small> (sending...)</small>}
          </p>
        ))}
      </div>
      <form ref={inputRef} className="space-y-2" action={handleMessage}>
        <Input
          className="w-1/3"
          type="text"
          name="message"
          placeholder="Enter message"
        />
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}
