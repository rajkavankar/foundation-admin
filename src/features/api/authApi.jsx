import { apiSlice } from "./apiSlice"

const AUTH_URL = "http://localhost:5000/api/auth"

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: `${AUTH_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const { useLoginUserMutation } = authApi
