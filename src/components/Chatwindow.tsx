import React from "react";
import { Search, Heart, Bell } from "lucide-react";

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
}

const DateDivider: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-3 my-1">
    <div className="flex-1 h-px bg-slate-200" />
    <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">{label}</span>
    <div className="flex-1 h-px bg-slate-200" />
  </div>
);

const FileAttachment: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 mt-1.5 max-w-[200px]">
    <div className="w-[44px] h-[34px] rounded-md bg-slate-100 flex items-center justify-center shrink-0">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    </div>
    <span className="text-[11.5px] font-semibold text-slate-600 truncate">{name}</span>
  </div>
);

const MessageBubble: React.FC<{
  msg: Message;
  myAvatar: string;
  theirAvatar: string;
}> = ({ msg, myAvatar, theirAvatar }) => {
  const sent = msg.sender === "me";
  return (
    <div className={`flex items-end gap-2 ${sent ? "flex-row-reverse" : ""}`}>
      <img
        src={sent ? myAvatar : theirAvatar}
        alt=""
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover shrink-0"
      />
      <div
        className={`flex flex-col ${sent ? "items-end" : "items-start"} max-w-[75%] sm:max-w-[65%]`}>
        <div
          className={`px-3.5 py-2.5 rounded-[16px] text-[13px] sm:text-[13.5px] leading-relaxed bg-[#F1F1F1]
            ${sent ? "text-orange-400 rounded-br-[4px]" : "text-slate-700 rounded-bl-[4px]"}`}>
          {msg.text}
        </div>
        {msg.file && <FileAttachment name={msg.file.name} />}
      </div>
    </div>
  );
};

const ChatInput: React.FC = () => (
  <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 shrink-0">
    <div className="flex items-center gap-2.5 sm:gap-3 bg-[#eef2f7] rounded-[14px] px-3 py-2.5">
      {/* Mic */}
      <button
        title="voice message"
        className="text-slate-400 hover:text-orange-400 transition-colors shrink-0">
        <svg
          width="17"
          height="17"
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
        className="flex-1 bg-transparent border-none outline-none text-[13px] sm:text-[13.5px] text-slate-700 placeholder:text-slate-400 min-w-0"
      />

      {/* Attachment + Camera — hidden on very small screens to save space */}
      <div className="hidden xs:flex items-center gap-2.5">
        <button
          title="attachment"
          className="text-slate-400 hover:text-orange-400 transition-colors">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
          </svg>
        </button>
        <button title="camera" className="text-slate-400 hover:text-orange-400 transition-colors">
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </button>
      </div>

      {/* Emoji */}
      <button
        title="emoji"
        className="text-slate-400 hover:text-orange-400 transition-colors shrink-0">
        <svg
          width="17"
          height="17"
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

      {/* Send */}
      <button
        title="send"
        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-400 hover:bg-orange-500 flex items-center justify-center shrink-0 transition-colors">
        <svg
          width="14"
          height="14"
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

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, myAvatar }) => (
  <div className="flex flex-col bg-[#FAFAFA]  rounded-2xl overflow-hidden shadow-sm h-full">
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
      {/* Action icons — hide some on mobile to avoid crowding */}
      <div className="flex gap-3 sm:gap-4 text-slate-400">
        <button title="search" className="hover:text-orange-400 transition-colors hidden sm:block">
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

    {/* Messages — scrolls independently */}
    <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 flex flex-col gap-3">
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
