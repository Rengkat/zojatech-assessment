import React from "react";
import { useNavigate } from "react-router-dom";
import mailBox from "../assets/mailbox.svg";
export const CheckMail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-4">
      <div className="w-20 h-16 flex items-center justify-center mx-auto mb-6 text-slate-500 relative">
        <img src={mailBox} alt="Mail Box" className="scale-120" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-3">Check your mailbox !</h2>

      <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
        We've sent an email to <span className="text-slate-700 font-medium">seyi@zojatech.com</span>{" "}
        with a an OTP to confirm your account. Check your inbox to activate your account.
      </p>

      <button
        onClick={() => navigate("/verify-email")}
        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm">
        Confirm Email
      </button>

      <div className="mt-8 text-xs text-slate-400">
        Didn't get the mail?{" "}
        <button className="text-brand-orange font-semibold hover:underline">Resend</button>
      </div>
    </div>
  );
};
