import { apiSlice } from "./index";
import { toast } from "../features/toast";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // `updateQueryData` requires the endpoint name and cache key arguments,
        // so it knows which piece of cache state to update
        console.log("triggered");
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          toast({
            type: "success",
            message: data.message,
          });
        } catch (err) {
          const {error} = err
          toast({
            type: "error",
            message: error.data[0],
          });
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authAPI;
