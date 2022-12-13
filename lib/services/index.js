import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PRODUCTION_BASE_URL, LOCAL_BASE_URL } from "../constants";
import { toast } from "../features/toast";
// import 
const baseQuery = fetchBaseQuery({
    baseUrl: LOCAL_BASE_URL,
    prepareHeaders: (header, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        header.set("Authorization", `Token ${token}`);
      }
      return header;
    },
  })

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    api.dispatch({
        type: "auth/logOut"
    })
    toast({"type": "error", "message": "Session expired please login to continue"})
    setTimeout(() => { 
        window.location.href = '/auth/login';
      }, 200)
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQueryWithReauth,
  tagTypes: ["assignments", "submissions"],
  endpoints: (builder) => ({}),
});
