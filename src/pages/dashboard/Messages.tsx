import React, { useState } from "react";
import GlobalHeaderActions from "../../components/GlobalHeaderActions";
import { ConversationList } from "../../components/Conversationlist";
import { ChatWindow } from "../../components/Chatwindow";
import { CONVERSATIONS, MESSAGES_BY_CONVO } from "../../mocks/messagesMocks";
import { ArrowLeft } from "lucide-react";

const MY_AVATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face";

const Messages: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const activeConvo = CONVERSATIONS.find((c) => c.id === activeId) ?? null;
  const messages = activeId ? (MESSAGES_BY_CONVO[activeId] ?? []) : [];

  // Called when user taps a conversation on mobile
  const handleSelect = (id: string) => {
    setActiveId(id);
    setMobileView("chat");
  };

  // Back button on mobile chat view → return to list
  const handleBack = () => {
    setMobileView("list");
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* ── Page header ── */}
      <header className="flex justify-between items-center mb-5 gap-3 shrink-0">
        {/* On mobile chat view, show a back arrow + contact name instead */}
        <div className="flex items-center gap-2 min-w-0">
          {mobileView === "chat" && activeConvo && (
            <button
              onClick={handleBack}
              className="lg:hidden p-1.5 -ml-1 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Back to conversations">
              <ArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">Messages</h1>
        </div>
        <GlobalHeaderActions />
      </header>

      <div className="flex gap-4 flex-1 min-h-0 overflow-hidden bg-[#FFFFFF] px-4 py-8 rounded-2xl shadow-sm">
        <div
          className={`
            flex-col min-h-0
            w-full lg:w-[260px] lg:shrink-0
            ${mobileView === "list" ? "flex" : "hidden"}
            lg:flex
          `}>
          <ConversationList
            conversations={CONVERSATIONS}
            activeId={activeId ?? ""}
            onSelect={handleSelect}
            currentUser={{
              name: "David Peters",
              role: "Senior Developer",
              avatar: MY_AVATAR,
            }}
          />
        </div>

        <div
          className={`
            flex-col flex-1 min-w-0 min-h-0
            ${mobileView === "chat" ? "flex" : "hidden"}
            lg:flex
          `}>
          {activeConvo ? (
            <ChatWindow
              contact={{
                name: activeConvo.name,
                avatar: activeConvo.avatar,
                online: activeId === "lisa",
              }}
              messages={messages}
              myAvatar={MY_AVATAR}
            />
          ) : (
            /* Desktop empty state — mobile never sees this because
               mobileView starts at "list" */
            <div className="hidden lg:flex flex-1 items-center justify-center bg-white rounded-2xl shadow-sm">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-3">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="1.8">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <p className="text-[14px] font-semibold text-slate-700">Select a conversation</p>
                <p className="text-[12px] text-slate-400 mt-1">
                  Choose from the list to start chatting
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
