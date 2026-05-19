import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://fe-test.revvex.io/api/admin" }),
  endpoints: (builder) => ({
    // Global endpoints
    // register
    //verify OTP
    //login
    //resend OTP
  }),
});
