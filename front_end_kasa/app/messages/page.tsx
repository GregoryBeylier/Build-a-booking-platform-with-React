import MessengerClient from "@/components/messages/MessengerClient";
import { mockConversations } from "@/lib/mockMessages";

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
