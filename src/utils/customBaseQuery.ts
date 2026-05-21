/**

 * RTK Query base query that:
 *  1. Attempts the real API (https://fe-test.zojapay.com/api/admin)
 *  2. On NETWORK failure → silently falls through to mock handlers
 *  3. On API error (4xx/5xx) → returns the real error to the UI
 */

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

/** Detect network-level failures (server unreachable) */
function isNetworkError(error: unknown): boolean {
  if (!error) return false;
  const e = error as any;
  // RTK Query wraps fetch errors as { status: 'FETCH_ERROR', error: string }
  return (
    e.status === "FETCH_ERROR" ||
    e.status === "TIMEOUT_ERROR" ||
    (typeof e.error === "string" &&
      (e.error.includes("ETIMEDOUT") ||
        e.error.includes("ECONNREFUSED") ||
        e.error.includes("Failed to fetch") ||
        e.error.includes("Network request failed")))
  );
}

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (!isNetworkError(result.error)) return result;

  console.warn("[customBaseQuery] Real API unreachable → using mock layer");

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
