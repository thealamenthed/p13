import {baseApi} from "../../services/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    login: b.mutation({
      query: (body) => ({url: "/user/login", method: "POST", body}) //renvoie token (via transformResponse)
    }),
    getProfile: b.query({
      query: () => ({url: "/user/profile", method: "POST"}), //renvoie body (profil)
      providesTags: ["Profile"]
    }),
    updateProfile: b.mutation({
      query: (body) => ({url: "/user/profile", method: "PUT", body}), //invalidatesTags: ['Profile'] => invalidation du cache du profil
      invalidatesTags: ["Profile"]
    })
  })
});

export const {useLoginMutation, useGetProfileQuery, useUpdateProfileMutation} = userApi;
