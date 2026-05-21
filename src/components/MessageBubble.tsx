export interface Message {
  id: string;
  sender: "me" | "them";
  text: string;
  file?: { name: string };
  dateDivider?: string;
}

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

export const MessageBubble: React.FC<{ msg: Message; myAvatar: string; theirAvatar: string }> = ({
  msg,
  myAvatar,
  theirAvatar,
}) => {
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
