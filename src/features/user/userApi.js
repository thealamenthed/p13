import {baseApi} from "../../services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation({
      query: (body) => ({url: "/user/login", method: "POST", body})
    }),
    getProfile: b.query({
      query: () => ({url: "/user/profile", method: "POST"}),
      providesTags: ["Profile"]
    }),
    updateProfile: b.mutation({
      query: (body) => ({url: "/user/profile", method: "PUT", body}),
      invalidatesTags: ["Profile"]
    })
  })
});

export const {useLoginMutation, useGetProfileQuery, useUpdateProfileMutation} = userApi;
