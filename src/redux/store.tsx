import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./features/appSlice";
import { authApi } from "./services/AuthApiSlice";
export const store = configureStore({
  reducer: {
    appSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
