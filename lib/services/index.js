import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sims-project.herokuapp.com/api/v1/",
    prepareHeaders: (header, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        header.set("Authorization", `Token ${token}`);
      }
      return header;
    },
  }),
  tagTypes: ["assignments"],
  endpoints: (builder) => ({}),
});
