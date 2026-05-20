import React, { useState } from "react";
import { Search, Plus, Bell } from "lucide-react";
import GlobalHeaderActions from "../../components/GlobalHeaderActions";
import { ConversationList } from "../../components/Conversationlist";
import { CONVERSATIONS, MESSAGES_BY_CONVO } from "../../mocks/messagesMocks";
import { ChatWindow } from "../../components/Chatwindow";
const MY_AVATAR =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face";
const Messages: React.FC = () => {
  const [activeId, setActiveId] = useState("lisa");

  const activeConvo = CONVERSATIONS.find((c) => c.id === activeId)!;
  const messages = MESSAGES_BY_CONVO[activeId] ?? [];

  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Messages</h1>
        <GlobalHeaderActions />
      </header>
      {/* Two-panel layout */}
      <div className="flex gap-4 flex-1 min-h-0">
        <ConversationList
          conversations={CONVERSATIONS}
          activeId={activeId}
          onSelect={setActiveId}
          currentUser={{
            name: "David Peters",
            role: "Senior Developer",
            avatar: MY_AVATAR,
          }}
        />

        <ChatWindow
          contact={{
            name: activeConvo.name,
            avatar: activeConvo.avatar,
            online: activeId === "lisa",
          }}
          messages={messages}
          myAvatar={MY_AVATAR}
        />
      </div>
    </div>
  );
};
export default Messages;
