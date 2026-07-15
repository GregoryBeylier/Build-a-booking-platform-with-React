import MessengerClient from "@/components/messages/MessengerClient";
import { mockConversations } from "@/lib/mockMessages";

export default function Messages() {
  return <MessengerClient conversations={mockConversations} />;
}
