import React from "react";
import { Search, Heart, Bell } from "lucide-react";

export interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  file?: { name: string; previewUrl?: string };
  dateDivider?: string;
}

interface ChatWindowProps {
  contact: { name: string; avatar: string; online?: boolean };
  messages: Message[];
  myAvatar: string;
}

const DateDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 my-1.5">
    <div className="flex-1 h-px bg-slate-200" />
    <span className="text-[11.5px] text-slate-400 font-medium">{label}</span>
    <div className="flex-1 h-px bg-slate-200" />
  </div>
);

const FileAttachment: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 mt-1.5 max-w-[220px]">
    <div className="w-[52px] h-[40px] rounded-md bg-slate-100 flex items-center justify-center shrink-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
    <span className="text-[12px] font-semibold text-slate-600">{name}</span>
  </div>
);

const MessageBubble: React.FC<{
  msg: Message;
  myAvatar: string;
  theirAvatar: string;
}> = ({ msg, myAvatar, theirAvatar }) => {
  const sent = msg.sender === "me";
  return (
    <div className={`flex items-end gap-2.5 ${sent ? "flex-row-reverse" : ""}`}>
      <img
        src={sent ? myAvatar : theirAvatar}
        alt=""
        className="w-8 h-8 rounded-full object-cover shrink-0"
      />
      <div className={`flex flex-col ${sent ? "items-end" : "items-start"}`}>
        <div
          className={`max-w-[65%] px-4 py-2.5 rounded-[18px] text-[13.5px] leading-relaxed
            ${
              sent
                ? "bg-[#F1F1F1] text-orange-400 rounded-br-[2px]"
                : "bg-[#F1F1F1] text-slate-700 rounded-bl-[2px]"
            }`}>
          {msg.text}
        </div>
        {msg.file && <FileAttachment name={msg.file.name} />}
      </div>
    </div>
  );
};

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, myAvatar }) => (
  <div className="flex-1 bg-white rounded-[18px] flex flex-col overflow-hidden shadow-sm">
    {/* Header */}
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-[42px] h-[42px] rounded-full object-cover"
          />
          {contact.online && (
            <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
          )}
        </div>
        <span className="text-[15px] font-bold text-slate-800">{contact.name}</span>
      </div>
      <div className="flex gap-4 text-slate-400">
        <button title="Search" className="hover:text-orange-400 transition-colors">
          <Search size={18} />
        </button>
        <button title="Like" className="hover:text-orange-400 transition-colors">
          <Heart size={18} />
        </button>
        <button title="Notifications" className="hover:text-orange-400 transition-colors">
          <Bell size={18} />
        </button>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">
      {messages.map((msg) => (
        <React.Fragment key={msg.id}>
          {msg.dateDivider && <DateDivider label={msg.dateDivider} />}
          <MessageBubble msg={msg} myAvatar={myAvatar} theirAvatar={contact.avatar} />
        </React.Fragment>
      ))}
    </div>

    {/* Input */}
    <ChatInput />
  </div>
);

const ChatInput: React.FC = () => (
  <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100">
    <div className="flex items-center gap-3 bg-[#eef2f7] rounded-[14px] px-3.5 py-2.5">
      <button
        title="Attach File"
        className="text-slate-400 hover:text-orange-400 transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Write Something..."
        className="flex-1 bg-transparent border-none outline-none text-[13.5px] text-slate-700 placeholder:text-slate-400"
      />
      <button title="Send" className="text-slate-400 hover:text-orange-400 transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
        </svg>
      </button>
      <button title="Emoji" className="text-slate-400 hover:text-orange-400 transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </button>
      <button title="Send" className="text-slate-400 hover:text-orange-400 transition-colors">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </button>
      <button
        title="Send"
        className="w-9 h-9 rounded-full bg-orange-400 hover:bg-orange-500 flex items-center justify-center shrink-0 transition-colors">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </div>
  </div>
);
