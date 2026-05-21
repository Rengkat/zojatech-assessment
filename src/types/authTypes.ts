export interface ApiUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

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

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: ApiUser;
    token: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    user?: ApiUser;
    token?: string;
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
    opt: number; // API typo — "opt" not "otp"
  };
}

export interface AuthUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
