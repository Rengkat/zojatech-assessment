import React, { useState } from "react";
import { User, Mail, Lock, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { validate, type Errors, type Fields } from "../../utils/helperFuntions";
import { useRegisterMutation } from "../../redux/services/AuthApiSlice";
import { useDispatch } from "react-redux";
import { setPendingEmail, setPendingOtp } from "../../redux/features/authSlice";
import { InputField } from "../../components/InputField";

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [values, setValues] = useState<Fields>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Errors>({});
  const [globalError, setGlobalError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((p) => ({ ...p, [name]: value }));
    setFieldErrors((p) => ({ ...p, [name]: undefined }));
    setGlobalError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    setFieldErrors({});

    const errs = validate(values);
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    try {
      const res = await register(values as any).unwrap();
      if (res.success) {
        console.log(res);
        dispatch(setPendingEmail(values.email));
        // OTP returned in response (mock + real API)
        if (res.data?.otp) dispatch(setPendingOtp(String(res.data.otp)));
        navigate("/register/verify-email");
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
        setGlobalError(data?.message ?? "Registration failed. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Register your account</h2>
      <p className="text-xs text-slate-400 mt-1 mb-6">
        Proceed to create account and setup your organization
      </p>

      {globalError && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
          <AlertCircle size={15} className="text-red-500 mt-0.5 shrink-0" />
          <p className="text-[13px] text-red-600">{globalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <InputField
            icon={<User size={16} />}
            name="first_name"
            placeholder="First Name"
            value={values.first_name ?? ""}
            error={fieldErrors.first_name}
            onChange={handleChange}
          />
          <InputField
            icon={<User size={16} />}
            name="last_name"
            placeholder="Last Name"
            value={values.last_name ?? ""}
            error={fieldErrors.last_name}
            onChange={handleChange}
          />
        </div>

        <InputField
          icon={<Mail size={16} />}
          name="email"
          type="email"
          placeholder="Work email"
          value={values.email}
          error={fieldErrors.email}
          onChange={handleChange}
        />

        <InputField
          icon={<Lock size={16} />}
          name="password"
          type="password"
          placeholder="Password"
          value={values.password}
          error={fieldErrors.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white
            font-medium py-3 rounded-xl text-sm transition-colors mt-2
            hover:bg-orange-400 hover:text-white
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-slate-100 disabled:hover:text-slate-400">
          {isLoading ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Creating account…
            </>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="text-xs text-slate-400 mt-6 leading-relaxed">
        By clicking the button above, you agree to our{" "}
        <a href="#" className="text-orange-400 hover:underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="text-orange-400 hover:underline">
          Privacy Policy
        </a>
        .
      </p>

      <div className="mt-8 pt-6 border-t border-slate-100 text-sm text-slate-500">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-400 font-medium hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};
