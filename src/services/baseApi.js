import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getToken, clearToken} from "./token";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  }
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extra) => {
    const res = await rawBaseQuery(args, api, extra);
    if (res.error && res.error.status === 401) {
      clearToken();
    }
    return res;
  },
  tagTypes: ["Profile"],
  endpoints: () => ({})
});
