import React from "react";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("first");
    // TODO: Execute logic or RTK Query triggers here...
    navigate("/register/check-mail");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Register your account</h2>
      <p className="text-xs text-slate-400 mt-1 mb-6">
        Proceed to create account and setup your organization
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
              required
            />
          </div>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
              required
            />
          </div>
        </div>

        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="email"
            placeholder="Work email"
            className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-100 text-slate-400 font-medium py-3 rounded-xl text-sm transition-colors hover:bg-brand-orange hover:text-white mt-2">
          Create account
        </button>
      </form>

      <p className="text-xs text-slate-400 mt-6 leading-relaxed">
        By clicking the button above, you agree to our{" "}
        <a href="#" className="text-brand-orange hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-brand-orange hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="text-brand-orange font-medium hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};
