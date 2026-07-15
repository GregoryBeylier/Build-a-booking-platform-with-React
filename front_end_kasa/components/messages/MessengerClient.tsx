"use client";

import { useState } from "react";
import Image from "next/image";
import { Conversation, Message } from "@/lib/api";
import BackButton from "../ui/BackButton";

export interface MessengerClientProps {
  conversations: Conversation[];
}

export default function MessengerClient({
  conversations: initialConversations,
}: MessengerClientProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [draft, setDraft] = useState("");

  const selectedConversation = conversations.find(
    (conversation) => conversation.id === selectedConversationId,
  );

  function handleSend() {
    if (!selectedConversation || draft.trim() === "") return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: 2,
      content: draft,
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    );

    setDraft("");
  }

  return (
    <div className="flex h-screen w-[calc(100%+2rem)] -mx-4 bg-white">
      {/* Colonne gauche : liste des conversations */}
      <div
        className={`${
          selectedConversationId ? "hidden md:flex" : "flex"
        } w-full md:w-1/4 md:min-w-[320px] md:max-w-[420px] border-r border-[#F5F5F5] flex-col`}
      >
        <div className="p-6">
          <BackButton label="Retour" href="/" />
          <h1 className="text-3xl font-bold mb-4 mt-[23px]">Messages</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => {
            const lastMessage =
              conversation.messages[conversation.messages.length - 1];
            const isSelected = conversation.id === selectedConversationId;

            return (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversationId(conversation.id)}
                className={`w-full flex items-center gap-3 p-4 text-left border-b border-[#F5F5F5] ${
                  isSelected ? "bg-[#FBEDE9]" : "bg-white"
                }`}
              >
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={conversation.picture}
                    alt={conversation.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold truncate">
                      {conversation.name}
                    </p>
                    {lastMessage && (
                      <span className="text-xs text-[#868686] shrink-0 ml-2">
                        {new Date(lastMessage.createdAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-[#868686] truncate">
                      {lastMessage?.content}
                    </p>
                    {conversation.unread && (
                      <span className="w-2 h-2 rounded-full bg-[#99331A] shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Colonne droite : fil de discussion */}
      <div
        className={`${
          selectedConversation ? "flex" : "hidden md:flex"
        } flex-col flex-1 bg-[#FBF3EE]`}
      >
        {selectedConversation ? (
          <>
            <div className="md:hidden p-4 border-b border-[#F5F5F5] bg-white">
              <BackButton
                label="Retour"
                onClick={() => setSelectedConversationId(null)}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
              {selectedConversation.messages.map((message, index) => {
                const isHost = message.senderId === selectedConversation.hostId;
                const previousMessage =
                  selectedConversation.messages[index - 1];
                const showDateSeparator =
                  !previousMessage ||
                  new Date(previousMessage.createdAt).toDateString() !==
                    new Date(message.createdAt).toDateString();

                return (
                  <div key={message.id}>
                    {showDateSeparator && (
                      <div className="flex items-center gap-4 my-4">
                        <div className="flex-1 h-px bg-[#E0E0E0]" />
                        <span className="text-xs text-[#868686] whitespace-nowrap">
                          {new Date(message.createdAt).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </span>
                        <div className="flex-1 h-px bg-[#E0E0E0]" />
                      </div>
                    )}

                    <div
                      className={`flex items-start gap-2 ${
                        isHost ? "justify-start" : "justify-end"
                      }`}
                    >
                      {isHost && (
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={selectedConversation.picture}
                            alt={selectedConversation.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`flex flex-col ${
                          isHost ? "items-start" : "items-end"
                        }`}
                      >
                        <span className="text-xs text-[#868686] mb-1">
                          {isHost ? selectedConversation.name : "Moi"} •{" "}
                          {new Date(message.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <p
                          className={`max-w-md rounded-2xl px-4 py-3 ${
                            isHost
                              ? "bg-white text-black"
                              : "bg-[#99331A] text-white"
                          }`}
                        >
                          {message.content}
                        </p>
                      </div>
                      {!isHost && (
                        <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src="/avatar-defaut.svg"
                            alt="Moi"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full h-[137px] bg-white border-t border-[#F5F5F5] py-[21px] px-[30px] flex items-center gap-[10px]">
              <div className="relative flex-1 rounded-2xl border border-[#E0E0E0] bg-white">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Envoyer un message"
                  rows={2}
                  className="w-full resize-none rounded-2xl px-4 py-3 pr-16 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  aria-label="Envoyer"
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-[#99331A] text-white flex items-center justify-center"
                >
                  ↑
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-[#868686]">
            Sélectionne une conversation pour afficher les messages
          </div>
        )}
      </div>
    </div>
  );
}
