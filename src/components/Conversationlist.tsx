import React from "react";
import { PenLine, Search } from "lucide-react";

export interface Conversation {
  id: string;
  name: string;
  preview: string;
  time: string;
  avatar: string;
  unread?: number;
  ticked?: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
  currentUser: { name: string; role: string; avatar: string };
}

const ConversationItem: React.FC<{
  convo: Conversation;
  active: boolean;
  onSelect: () => void;
}> = ({ convo, active, onSelect }) => (
  <>
    <button
      onClick={onSelect}
      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors
        ${active ? "bg-orange-50" : "hover:bg-gray-50"}`}>
      <img
        src={convo.avatar}
        alt={convo.name}
        className="w-10 h-10 rounded-full object-cover shrink-0"
      />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-orange-400 mb-0.5 truncate">{convo.name}</p>
        <p className="text-[11.5px] text-slate-400 truncate">{convo.preview}</p>
      </div>
      <div className="flex flex-col items-end gap-1 shrink-0">
        <span className="text-[10.5px] text-slate-400">{convo.time}</span>
        {convo.unread ? (
          <span className="w-[18px] h-[18px] rounded-full bg-orange-400 text-white text-[10px] font-bold flex items-center justify-center">
            {convo.unread}
          </span>
        ) : convo.ticked ? (
          <span className="text-slate-400 text-[13px]">✓✓</span>
        ) : null}
      </div>
    </button>
    <div className="h-px bg-slate-100 mx-4" />
  </>
);

export const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeId,
  onSelect,
  currentUser,
}) => (
  <div className="w-[260px] shrink-0 bg-white rounded-[18px] flex flex-col overflow-hidden shadow-sm">
    {/* Header */}
    <div className="px-4 pt-4 pb-3 border-b border-slate-100">
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-[42px] h-[42px] rounded-full object-cover"
          />
          <div>
            <p className="text-[14px] font-bold text-orange-400">{currentUser.name}</p>
            <p className="text-[11px] text-slate-400">{currentUser.role}</p>
          </div>
        </div>
        <button
          title="en"
          className="w-[30px] h-[30px] rounded-full border border-slate-100 bg-white flex items-center justify-center hover:bg-slate-50 transition-colors">
          <PenLine size={14} className="text-slate-400" />
        </button>
      </div>
      <div className="flex items-center gap-2 bg-slate-50 rounded-[10px] px-3 py-2">
        <Search size={13} className="text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search Here..."
          className="bg-transparent border-none outline-none text-[12.5px] text-slate-400 placeholder:text-slate-400 w-full"
        />
      </div>
    </div>

    {/* List */}
    <div className="flex-1 overflow-y-auto py-2">
      {conversations.map((c) => (
        <ConversationItem
          key={c.id}
          convo={c}
          active={c.id === activeId}
          onSelect={() => onSelect(c.id)}
        />
      ))}
    </div>
  </div>
);
