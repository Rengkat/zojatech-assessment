import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "../../utils/customBaseQuery";

export interface RegisterPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user?: ApiUser;
    token?: string;
    otp?: number;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: ApiUser;
    token: string;
  };
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: [] | Record<string, never>;
}

export interface ResendOtpResponse {
  success: boolean;
  message: string;
  data: {
    opt: number;
  };
}
export const authApi = createApi({
  reducerPath: "authApi",
  // Only change: fetchBaseQuery → customBaseQuery (mock fallback built-in)
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: (body) => ({ url: "/register", method: "POST", body }),
    }),

    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),

    verifyOtp: builder.mutation<VerifyOtpResponse, VerifyOtpPayload>({
      query: (body) => ({ url: "/verify-otp", method: "POST", body }),
    }),

    resendOtp: builder.mutation<ResendOtpResponse, ResendOtpPayload>({
      query: (body) => ({ url: "/resend-otp", method: "POST", body }),
    }),
    logout: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({ url: "/logout", method: "POST" }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
} = authApi;
