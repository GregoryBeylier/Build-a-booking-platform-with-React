import MessengerClient from "@/components/messages/MessengerClient";
import { mockConversations } from "@/lib/mockMessages";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message",
  description:
    "Consultez vos échanges avec les hôtes et retrouvez toutes vos conversations Kasa au même endroit.",
};

export default async function Messages({
  searchParams,
}: {
  searchParams: Promise<{ hostId?: string }>;
}) {
  const { hostId } = await searchParams;
  return (
    <MessengerClient conversations={mockConversations} initialHostId={hostId} />
  );
}
