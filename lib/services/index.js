import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PRODUCTION_BASE_URL, LOCAL_BASE_URL } from "../constants";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: PRODUCTION_BASE_URL,
    prepareHeaders: (header, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        header.set("Authorization", `Token ${token}`);
      }
      return header;
    },
  }),
  tagTypes: ["assignments", "submissions"],
  endpoints: (builder) => ({}),
});
