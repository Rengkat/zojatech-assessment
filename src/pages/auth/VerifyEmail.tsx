import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useVerifyOtpMutation, useResendOtpMutation } from "../../redux/services/AuthApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { setPendingOtp, type AuthState } from "../../redux/features/authSlice";

const OTP_LENGTH = 4;
const RESEND_COOLDOWN = 60; // seconds

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pendingEmail = useSelector((s: { auth: AuthState }) => s.auth.pendingEmail);
  const pendingOtp = useSelector((s: { auth: AuthState }) => s.auth.pendingOtp);

  const [verifyOtp, { isLoading: verifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resending }] = useResendOtpMutation();

  // Pre-fill boxes if OTP came back in the register/resend response
  const [digits, setDigits] = useState<string[]>(() =>
    pendingOtp?.length === OTP_LENGTH ? pendingOtp.split("") : Array(OTP_LENGTH).fill(""),
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(id);
  }, [countdown]);

  const focusInput = (idx: number) => inputsRef.current[idx]?.focus();

  const handleChange = (idx: number, val: string) => {
    const char = val.replace(/\D/g, "").slice(-1);
    setError("");
    const next = [...digits];
    next[idx] = char;
    setDigits(next);
    if (char && idx < OTP_LENGTH - 1) focusInput(idx + 1);
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        const next = [...digits];
        next[idx] = "";
        setDigits(next);
      } else if (idx > 0) {
        focusInput(idx - 1);
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      focusInput(idx - 1);
    } else if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) {
      focusInput(idx + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!text) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setDigits(next);
    focusInput(Math.min(text.length, OTP_LENGTH - 1));
  };

  const handleSubmit = useCallback(async () => {
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setError("Please enter all 4 digits.");
      return;
    }
    setError("");
    try {
      const res = await verifyOtp({ otp }).unwrap();
      if (res.success) {
        setSuccess("OTP verified! Redirecting…");
        setTimeout(() => navigate("/register/verified-success"), 1200);
      }
    } catch (err: any) {
      setError(err?.data?.message ?? "Invalid OTP. Please try again.");
      setDigits(Array(OTP_LENGTH).fill(""));
      setTimeout(() => focusInput(0), 50);
    }
  }, [digits, verifyOtp, navigate]);

  // Auto-submit when all digits filled
  useEffect(() => {
    if (digits.every((d) => d !== "") && !verifying) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits]);

  const handleResend = async () => {
    if (countdown > 0 || resending || !pendingEmail) return;
    setError("");
    setSuccess("");
    try {
      const res = await resendOtp({ email: pendingEmail }).unwrap();
      setSuccess("A new OTP has been sent to your email.");
      setCountdown(RESEND_COOLDOWN);
      // Store & pre-fill new OTP if returned in response
      const newOtp = res.data?.opt ? String(res.data.opt) : null;
      if (newOtp) {
        dispatch(setPendingOtp(newOtp));
        setDigits(newOtp.length === OTP_LENGTH ? newOtp.split("") : Array(OTP_LENGTH).fill(""));
      } else {
        setDigits(Array(OTP_LENGTH).fill(""));
        setTimeout(() => focusInput(0), 50);
      }
    } catch (err: any) {
      setError(err?.data?.message ?? "Failed to resend OTP.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Verify your email</h2>
      <p className="text-xs text-slate-400 mt-1 mb-2">
        A four digit OTP code has been sent to your email{" "}
      </p>
      <p className="text-sm font-medium text-slate-700 mb-6 truncate">{pendingEmail ?? ""}</p>

      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-[13px] text-red-600">{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-start gap-2.5 bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
          <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
          <p className="text-[13px] text-green-600">{success}</p>
        </div>
      )}

      <div className="flex gap-3 mb-6" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            title="Enter OTP digit"
            aria-label={`OTP digit ${i + 1}`}
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            autoFocus={i === 0}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`w-14 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all
              ${d ? "border-orange-400 bg-orange-50 text-orange-500" : "border-slate-200 text-slate-800"}
              focus:border-orange-400 focus:ring-2 focus:ring-orange-100
              ${error ? "border-red-300 bg-red-50" : ""}`}
          />
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={verifying || digits.join("").length < OTP_LENGTH}
        className="w-full flex items-center justify-center gap-2 bg-orange-400 text-white
          font-medium py-3 rounded-xl text-sm transition-colors mb-4
          hover:bg-orange-400 hover:text-white
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-400">
        {verifying ? (
          <>
            <Loader2 size={15} className="animate-spin" /> Verifying…
          </>
        ) : (
          "Confirm code"
        )}
      </button>

      {/* ── Resend ── */}
      <div className="text-center text-sm text-slate-500">
        Didn't receive it?{" "}
        {countdown > 0 ? (
          <span className="text-slate-400">
            Resend in <span className="font-medium text-orange-400">{countdown}s</span>
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={resending}
            className="text-orange-400 font-medium hover:underline disabled:opacity-60">
            {resending ? "Resending…" : "Resend OTP"}
          </button>
        )}
      </div>

      {/* Dev hint */}
      {import.meta.env.DEV && (
        <p className="text-[10px] text-slate-300 text-center mt-4">
          Check browser console (F12) for mock OTP
        </p>
      )}
    </div>
  );
};
