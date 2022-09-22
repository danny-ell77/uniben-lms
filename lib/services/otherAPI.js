import { apiSlice } from "./index";
import { notify } from "../alertSlice";
import { toast } from "../features/toast";

export const otherAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignments: builder.query({
      query: () => ({
        url: "assignments",
        method: "GET",
      }),
      providesTags: ["assignments"],
    }),
    createAssignment: builder.mutation({
      query: (body) => ({
        url: "assignments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["assignments"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          toast({
            type: "success",
            message: data.message,
          });
        } catch (err) {
          toast({
            type: "error",
            message: "something went wrong",
          });
        }
      },
    }),
    getSubmissions: builder.query({
      query: () => ({
        url: "submissions",
        method: "GET",
      }),
      providesTags: ["submissions"],
    }),
    createSubmission: builder.mutation({
      query: (body) => ({
        url: "submissions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["submissions"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          toast({
            type: "success",
            message: data.message,
          });
        } catch (err) {
          toast({
            type: "error",
            message: "something went wrong",
          });
        }
      },
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useGetSubmissionsQuery,
  useCreateSubmissionMutation,
} = otherAPI;
