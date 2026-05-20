import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/logo.svg";
import tick from "../assets/ticks.svg";
export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#FFFFFF]">
      {/* Left Column */}
      <div className="hidden lg:flex flex-col p-16 max-w-2xl mx-auto w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Buddy" />
        </div>

        <div className="space-y-8 mt-[10rem]">
          {[
            "Track real-time overview of company's financial performance.",
            "Track created projects budget against actual revenue and expenses.",
            "Highlighted reports on budget deficit and surplus, accounting dimensions, balance sheets and real-time sales margin estimation.",
          ].map((text, i) => (
            <div key={i} className="flex gap-4 items-start">
              <img src={tick} alt="" width={22} height={22} className="mt-0.5 flex-shrink-0" />
              <p className="text-slate-600 font-medium">{text}</p>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-400 mt-[8rem]">© 2026 Revvex. All rights reserved</p>
      </div>

      {/* Right Column */}
      <div className="flex flex-col items-center pt-[4rem] lg:pt-[10rem] pb-10 px-6 bg-[#F8FAFC]">
        {/* Form card */}
        <div className="bg-white rounded-[8px] shadow-sm border border-slate-100 w-full max-w-[489px] p-[50px]">
          <Outlet />
        </div>

        <div className="w-full max-w-[489px] flex justify-end mt-[6rem] lg:mt-[8rem]">
          <button className="bg-brand-orange text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-medium hover:bg-orange-600 transition-colors">
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
    </div>
  );
};
