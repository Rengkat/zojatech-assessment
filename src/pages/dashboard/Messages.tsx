import React, { useState } from "react";
import { Search, Plus, Bell } from "lucide-react";
import GlobalHeaderActions from "../../components/GlobalHeaderActions";

const Messages: React.FC = () => {
  const [activeId, setActiveId] = useState("lisa");

  return (
    <div className="flex flex-col flex-1">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800">Messages</h1>
        <GlobalHeaderActions />
      </header>
      {/* Two-panel layout */}
      <div className="flex gap-4 flex-1 min-h-0"></div>
    </div>
  );
};
export default Messages;
