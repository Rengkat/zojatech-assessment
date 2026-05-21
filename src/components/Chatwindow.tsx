import React, { useRef, useEffect } from "react";
import { Search, Heart, Bell } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";

export interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  file?: { name: string };
  dateDivider?: string;
}

interface ChatWindowProps {
  contact: { name: string; avatar: string; online?: boolean };
  messages: Message[];
  myAvatar: string;
  onSend: (text: string, file?: { name: string }) => void;
}

const DateDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 my-1">
    <div className="flex-1 h-px bg-slate-200" />
    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{label}</span>
    <div className="flex-1 h-px bg-slate-200" />
  </div>
);

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, myAvatar, onSend }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col bg-[#FAFAFA] rounded-2xl overflow-hidden shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-9 h-9 sm:w-[42px] sm:h-[42px] rounded-full object-cover"
            />
            {contact.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
            )}
          </div>
          <span className="text-[14px] sm:text-[15px] font-bold text-slate-800 truncate">
            {contact.name}
          </span>
        </div>
        <div className="flex gap-3 sm:gap-4 text-slate-400">
          <button
            title="search"
            className="hover:text-orange-400 transition-colors hidden sm:block">
            <Search size={17} />
          </button>
          <button title="favorite" className="hover:text-orange-400 transition-colors">
            <Heart size={17} />
          </button>
          <button title="notifications" className="hover:text-orange-400 transition-colors">
            <Bell size={17} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <React.Fragment key={msg.id}>
            {msg.dateDivider && <DateDivider label={msg.dateDivider} />}
            <MessageBubble msg={msg} myAvatar={myAvatar} theirAvatar={contact.avatar} />
          </React.Fragment>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} />
    </div>
  );
};
