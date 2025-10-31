// src/services/baseApi.js
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {loggedOut} from "../features/auth/authSlice";
import {clearToken} from "./token";

// BaseQuery avec injection automatique du JWT depuis Redux sur toutes les requêtes
const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001/api/v1",
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth?.token;
    if (token) headers.set("Authorization", `Bearer ${token}`); // injection du JWT dans les headers
    return headers;
  }
});

//  Gestion des erreurs 401 et déclencher un logout global
const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // Token expiré/invalide => purge le token et reset le cache + redirection via garde de route
    clearToken();
    api.dispatch(loggedOut());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Profile"],
  endpoints: () => ({})
});
