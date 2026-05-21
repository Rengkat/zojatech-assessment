import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/services/AuthApiSlice";
import { setPendingEmail } from "../../redux/features/authSlice";
import { validate, type Errors } from "../../utils/helperFuntions";

const EMAIL_MAX = 60;
const PASSWORD_MAX = 15;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [globalError, setGlobalError] = useState("");

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    setFieldErrors({});

    try {
      const res = await login({ email, password }).unwrap();
      if (res.success) {
        dispatch(setPendingEmail(email));
        navigate("/dashboard");
      }
    } catch (err: any) {
      const data = err?.data;
      if (data?.errors) {
        const mapped: Errors = {};
        for (const [k, v] of Object.entries(data.errors)) {
          (mapped as any)[k] = Array.isArray(v) ? (v as string[]).join(" ") : String(v);
        }
        setFieldErrors(mapped);
      } else {
        setGlobalError(data?.message ?? "Login failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-1">Log in to your account</h2>
      <p className="text-xs text-slate-400 mb-6">
        Proceed to create account and setup your organization
      </p>

      {/* Global error */}
      {globalError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
          <p className="text-[13px] text-red-600">{globalError}</p>
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Email</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              title="email"
              type="email"
              value={email}
              maxLength={EMAIL_MAX}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((p) => ({ ...p, email: undefined }));
              }}
              className="w-full border border-brand-orange rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.email}</p>
          )}
          <p className="text-right text-[10px] text-slate-400 font-medium mt-1">
            {email.length} / {EMAIL_MAX}
          </p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">Password</label>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              title="password"
              type={showPassword ? "text" : "password"}
              value={password}
              maxLength={PASSWORD_MAX}
              onChange={(e) => {
                setPassword(e.target.value);
                setFieldErrors((p) => ({ ...p, password: undefined }));
              }}
              className="w-full border border-brand-orange rounded-xl pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              required
            />
            <button
              title="toggle password"
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.password}</p>
          )}
          <p className="text-right text-[10px] text-slate-400 font-medium mt-1">
            {password.length} / {PASSWORD_MAX}
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
          {isLoading ? "Signing in…" : "Login"}
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
        Don't have an account?{" "}
        <Link to="/register" className="text-brand-orange font-medium hover:underline">
          Register
        </Link>
      </div>
    </div>
  );
};
