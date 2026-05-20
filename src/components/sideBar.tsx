import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Users, MessageSquare, TrendingUp, DollarSign, Settings, LogOut } from "lucide-react";
import logo from "../assets/logo.svg";

const navItems = [
  { icon: User, label: "My Portfolio", path: "/portfolio" },
  { icon: Users, label: "My Group", path: "/group" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
  { icon: TrendingUp, label: "Analytics", path: "/analytics" },
  { icon: DollarSign, label: "Pack", path: "/pack" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <aside className="w-[200px] bg-white min-h-screen flex flex-col justify-between border-r border-slate-100 py-8 fixed left-0 top-0 h-full">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-2 px-6 mb-10">
          <img src={logo} alt="Buddy" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  active
                    ? "text-brand-orange"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}>
                {/* Active left bar — sits on the very left edge of the sidebar */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-orange rounded-r-full" />
                )}
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className="flex flex-col items-center text-center px-6">
        <img
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
          alt="Theresa Milly"
          className="w-16 h-16 rounded-full object-cover mb-3"
        />
        <h4 className="font-semibold text-sm text-slate-800">Theresa milly</h4>
        <p className="text-xs text-slate-400 mb-5">Influencer</p>
        <button className="w-full flex items-center justify-center gap-2 py-2.5 border border-orange-200 text-brand-orange rounded-xl text-sm font-medium hover:bg-orange-50 transition-colors">
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
};
