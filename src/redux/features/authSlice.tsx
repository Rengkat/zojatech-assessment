import { createSlice } from "@reduxjs/toolkit";
import { authApi, type ApiUser } from "../services/AuthApiSlice";

export interface AuthState {
  user: ApiUser | null;
  token: string | null;
  isAuthenticated: boolean;
  pendingEmail: string | null;
}

const TOKEN_KEY = "buddy_token";
const USER_KEY = "buddy_user";

function loadToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}
function loadUser(): ApiUser | null {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) ?? "null");
  } catch {
    return null;
  }
}

const initialState: AuthState = {
  token: loadToken(),
  user: loadUser(),
  isAuthenticated: !!loadToken(),
  pendingEmail: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.pendingEmail = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
    setPendingEmail(state, action: { payload: string }) {
      state.pendingEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { token, user } = payload.data;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    });

    builder.addMatcher(authApi.endpoints.register.matchFulfilled, (state, { payload }) => {
      if (payload.data?.token) {
        state.token = payload.data.token;
        localStorage.setItem(TOKEN_KEY, payload.data.token);
      }
      if (payload.data?.user) {
        state.user = payload.data.user;
        localStorage.setItem(USER_KEY, JSON.stringify(payload.data.user));
      }
    });
  },
});

export const { logout, setPendingEmail } = authSlice.actions;
export default authSlice.reducer;
