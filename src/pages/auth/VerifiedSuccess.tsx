import React from "react";
import { useNavigate } from "react-router-dom";
import verifieEmailIcon from "../../assets/verifiedEmail.svg";

export const VerifiedSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-500">
        <img src={verifieEmailIcon} alt="Verified Email" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">Email verified !</h2>
      <p className="text-xs text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
        The verified email address will be associated with your account. Click on the button below
        to continue
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="w-full bg-brand-orange hover:bg-orange-600 text-white font-medium py-3 rounded-xl text-sm transition-colors shadow-sm">
        Continue
      </button>
    </div>
  );
};
