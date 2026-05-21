import { useRef, useState } from "react";
import { Paperclip } from "lucide-react";

export const ChatInput: React.FC<{
  onSend: (text: string, file?: { name: string }) => void;
}> = ({ onSend }) => {
  const [text, setText] = useState("");
  const [pendingFile, setPendingFile] = useState<{ name: string } | undefined>();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim() && !pendingFile) return;
    onSend(text, pendingFile);
    setText("");
    setPendingFile(undefined);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPendingFile({ name: file.name });
    e.target.value = ""; // reset so same file can be re-selected
  };

  return (
    <div className="px-4 sm:px-5 py-3 bg-slate-50 border-t border-slate-100 shrink-0">
      {/* Pending file badge */}
      {pendingFile && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[11px] bg-orange-50 text-orange-400 border border-orange-200 rounded-lg px-2.5 py-1 font-medium truncate max-w-[200px]">
            📎 {pendingFile.name}
          </span>
          <button
            onClick={() => setPendingFile(undefined)}
            className="text-slate-400 hover:text-red-400 text-xs transition-colors">
            ✕
          </button>
        </div>
      )}

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
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Write Something..."
          className="flex-1 bg-transparent border-none outline-none text-[13px] sm:text-[13.5px] text-slate-700 placeholder:text-slate-400 min-w-0"
        />

        {/* File attachment */}
        <div className="hidden xs:flex items-center gap-2.5">
          <input
            title="attach"
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            title="attachment"
            onClick={() => fileRef.current?.click()}
            className="text-slate-400 hover:text-orange-400 transition-colors">
            <Paperclip size={17} />
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
          onClick={handleSend}
          disabled={!text.trim() && !pendingFile}
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-400 hover:bg-orange-500
            disabled:opacity-40 flex items-center justify-center shrink-0 transition-colors">
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
};
