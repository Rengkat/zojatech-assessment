import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { mockLogin, mockRegister, mockVerifyOtp, mockResendOtp } from "./mockApi";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "https://fe-test.zojapay.com/api/admin",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    headers.set("Accept", "application/json");
    return headers;
  },
});

function shouldUseMock(error: unknown): boolean {
  if (!error) return false;
  const e = error as any;
  if (e.status === "FETCH_ERROR" || e.status === "TIMEOUT_ERROR" || e.status === 500) return true;
  if (
    typeof e.error === "string" &&
    (e.error.includes("ETIMEDOUT") ||
      e.error.includes("ECONNREFUSED") ||
      e.error.includes("Failed to fetch") ||
      e.error.includes("Network request failed"))
  )
    return true;
  return false;
}

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  // Real 4xx (401, 422, etc.) → return directly, let UI handle it
  if (!shouldUseMock(result.error)) return result;

  // Network error or 500 → fall through to mock layer
  console.warn(
    "[customBaseQuery] API unavailable (status:",
    (result.error as any)?.status,
    ") → using mock",
  );

  const { url, method, body } =
    typeof args === "string" ? { url: args, method: "GET", body: undefined } : args;

  try {
    let data: unknown;

    if (url === "/login" && method === "POST") {
      data = await mockLogin(body as any);
    } else if (url === "/register" && method === "POST") {
      data = await mockRegister(body as any);
    } else if (url === "/verify-otp" && method === "POST") {
      data = await mockVerifyOtp((body as any)?.otp);
    } else if (url === "/resend-otp" && method === "POST") {
      data = await mockResendOtp((body as any)?.email);
    } else if (url === "/logout" && method === "POST") {
      await new Promise((r) => setTimeout(r, 300));
      data = { success: true, message: "Logged out" };
    } else {
      return {
        error: {
          status: 404,
          data: { message: `Mock not found for ${method} ${url}` },
        } as FetchBaseQueryError,
      };
    }

    return { data };
  } catch (mockError: any) {
    return {
      error: {
        status: mockError.status ?? 500,
        data: mockError.data ?? { message: "Mock error" },
      } as FetchBaseQueryError,
    };
  }
};
