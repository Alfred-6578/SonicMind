import type { Metadata } from "next";
import { ChatShell } from "@/components/chat/chat-shell";

export const metadata: Metadata = {
  title: "Chat — SonicMind",
};

export default function Page() {
  return <ChatShell />;
}
