/**
 * Simulates the Zojapay API when the real server is unreachable.
 * Mirrors exact response shapes from the Postman docs.
 *
 * To FORCE real API only (disable mocks): set VITE_USE_MOCK=false
 */

import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  VerifyOtpResponse,
  ResendOtpResponse,
} from "../redux/services/AuthApiSlice";

const delay = (ms = 900) => new Promise((r) => setTimeout(r, ms));

// In-memory OTP store (simulates server-side OTP generation)
let _currentOtp = "1234";
let _registeredEmails = new Set<string>();

const MOCK_USER = {
  id: 4,
  first_name: "echoes",
  last_name: "willieams",
  email: "willl@gmail.com",
  email_verified_at: null,
  created_at: "2022-11-09T23:10:45.000000Z",
  updated_at: "2022-11-09T23:10:45.000000Z",
};

const MOCK_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.MOCK_TOKEN_FOR_LOCAL_DEVELOPMENT";

export async function mockLogin(body: LoginPayload): Promise<LoginResponse> {
  await delay();
  // Accept any email/password for demo; real server validates
  if (!body.email || !body.password) {
    throw { status: 422, data: { message: "Email and password are required." } };
  }
  return {
    success: true,
    message: "Login suceessful",
    data: {
      user: { ...MOCK_USER, email: body.email },
      token: MOCK_TOKEN,
    },
  };
}

export async function mockRegister(body: RegisterPayload): Promise<RegisterResponse> {
  await delay();
  if (_registeredEmails.has(body.email)) {
    throw {
      status: 422,
      data: {
        message: "Validation error",
        errors: { email: ["The email has already been taken."] },
      },
    };
  }
  _registeredEmails.add(body.email);
  _currentOtp = String(Math.floor(1000 + Math.random() * 9000));
  console.info(`[MOCK] OTP for ${body.email}: ${_currentOtp}`);
  return {
    success: true,
    message: "Registration successful",
    data: {
      otp: Number(_currentOtp),
      user: {
        id: Date.now(),
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        email_verified_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      token: MOCK_TOKEN,
    },
  };
}

export async function mockVerifyOtp(otp: string): Promise<VerifyOtpResponse> {
  await delay();
  if (otp !== _currentOtp) {
    throw {
      status: 422,
      data: { message: "Invalid OTP. Please check and try again." },
    };
  }
  return { success: true, message: "OTP verified successfully", data: [] };
}

export async function mockResendOtp(email: string): Promise<ResendOtpResponse> {
  await delay(600);
  _currentOtp = String(Math.floor(1000 + Math.random() * 9000));
  console.info(`[MOCK] Resent OTP for ${email}: ${_currentOtp}`);
  return {
    success: true,
    message: "OTP resent successfully",
    data: { opt: Number(_currentOtp) },
  };
}

/** Returns true when running in mock mode */
export const isMockMode = () => import.meta.env.VITE_USE_MOCK !== "false";
