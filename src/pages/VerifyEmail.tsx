import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["9", "4", "2", "1"]);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-advance to next slot if value is populated
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: RTK Query verification mutation trigger here
    navigate("/register/success");
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
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, idx)}
              className="w-14 h-14 border-2 border-brand-orange text-center rounded-xl font-bold text-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-brand-orange hover:bg-orange-600 text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm">
          Confirm code
        </button>
      </form>

      <div className="mt-6 text-xs text-slate-400">
        Didn't get the mail?{" "}
        <button className="text-brand-orange font-semibold hover:underline">Resend</button>
      </div>
    </div>
  );
};
