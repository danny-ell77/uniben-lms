import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sims-project.herokuapp.com/api/v1/",
  }),
  endpoints: (builder) => ({}),
});
