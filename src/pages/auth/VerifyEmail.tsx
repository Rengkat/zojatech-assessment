import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (value: string, index: number) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // take last char typed
    setOtp(newOtp);

    // Auto-advance on fill
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index]) {
        // Clear current box first
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // If already empty, go back and clear previous
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;

    const newOtp = ["", "", "", ""];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);

    // Focus the box after the last pasted digit (or last box)
    const nextIndex = Math.min(pasted.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/register/verified-success");
  };

  return (
    <div className="text-center lg:text-left">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Verify your email</h2>
      <p className="text-xs text-slate-400 mb-6 leading-relaxed">
        A four digit OTP code has been sent to your email <br />
        <span className="text-brand-orange font-medium">seyi@zojatech.com</span>
      </p>

      <form onSubmit={handleConfirm} className="space-y-6">
        <div className="flex justify-center lg:justify-start gap-3">
          {otp.map((digit, idx) => (
            <input
              title="otp"
              key={idx}
              ref={(el) => {
                inputRefs.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              onFocus={handleFocus}
              className="w-14 h-14 border-2 border-brand-orange text-center rounded-xl font-bold text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={otp.some((d) => !d)}
          className="w-full bg-brand-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm">
          Confirm code
        </button>
      </form>

      <div className="mt-6 text-xs text-slate-400">
        Didn't get the mail?{" "}
        <button
          type="button"
          onClick={() => setOtp(["", "", "", ""])}
          className="text-brand-orange font-semibold hover:underline">
          Resend
        </button>
      </div>
    </div>
  );
};
