import React from "react";
import { Outlet, Link } from "react-router-dom";
import { CheckCircle2, HelpCircle } from "lucide-react";
import logo from "../assets/logo.svg";
import tick from "../assets/ticks.svg";
export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#F8F9FA]">
      {/* Left Column: Branding & Features */}
      <div className="hidden lg:flex flex-col justify-between p-16 max-w-2xl mx-auto h-full">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" />
        </div>

        <div className="space-y-8 my-auto">
          <div className="flex gap-4 items-start">
            <img src={tick} alt="" width={22} height={22} />
            <p className="text-slate-600 font-medium">
              Track real-time overview of company’s financial performance.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <img src={tick} alt="" width={22} height={22} />
            <p className="text-slate-600 font-medium">
              Track created projects budget against actual revenue and expenses.
            </p>
          </div>
          <div className="flex gap-4 items-start">
            <img src={tick} alt="" width={22} height={22} />
            <p className="text-slate-600 font-medium">
              Highlighted reports on budget deficit and surplus, accounting dimensions, balance
              sheets and real-time sales margin estimation.
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-400">© 2026 Revvex. All rights reserved</p>
      </div>

      {/* Right Column: Dynamic Form Container */}
      <div className="flex items-center justify-center p-6 relative min-h-screen">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 w-full max-w-md">
          {/* Internal routes (RegisterOptions or RegisterForm) swap here */}
          <Outlet />
        </div>

        {/* Sticky Help Trigger */}
        <button className="absolute bottom-8 right-8 bg-brand-orange text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium hover:bg-orange-600 transition-colors">
          <span>Get Help</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};
