import MessengerClient from "@/components/messages/MessengerClient";
import { mockConversations } from "@/lib/mockMessages";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Message",
  description:
    "Consultez vos échanges avec les hôtes et retrouvez toutes vos conversations Kasa au même endroit.",
};

/**
 * Page Messages : affiche la messagerie avec les conversations de
 * l'utilisateur, en ouvrant éventuellement celle d'un hôte donné.
 *
 * @param props - Les propriétés de la page.
 * @param props.searchParams - Promesse des paramètres d'URL, contenant
 * éventuellement `hostId`, l'identifiant de l'hôte dont la conversation
 * doit être ouverte.
 * @returns La messagerie avec la liste des conversations.
 */
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
