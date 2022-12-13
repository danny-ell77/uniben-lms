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
    getSingleAssignment: builder.query({
      query: (id) => ({
        url: `assignments/${id}`,
        method: "GET",
      }),
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
          const { error: { data} = {} } = err
          toast({
            type: "error",
            message: data.detail,
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
          // console.log(data);
          toast({
            type: "success",
            message: data.message,
          });
          return data
        } catch (err) {
          toast({
            type: "error",
            message: "something went wrong",
          });
        }
      },
    }),
    editSubmission: builder.mutation({
      query: ({id, body}) => ({
        url: `submissions/${id}`,
        method: "PATCH",
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
    getAccountInformation: builder.query({
      query: () => ({
        url: "profile",
        method: "GET"
      })
    }),
    editProfile: builder.mutation({
      query: ({body}) => ({
        url: `profile`,
        method: "PATCH",
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
          toast({
            type: "error",
            message: "something went wrong",
          });
        }
      },
    }),
    getCourseMaterials: builder.query({
      query: () => ({
        url: "course-materials",
        method: "GET"
      }),
      providesTags: ["course-materials"]
    }),
    directUploadStart: builder.mutation({
       query: (body) => ({
        url: `course-material/start_upload`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (err) {
          toast({
            type: "error",
            message: "something went wrong",
          });
        }
      },
    }),
    directUploadFinish: builder.mutation({
      query: (body) => {
        console.log(body)
        return ({
        url: `course-material/finish_upload`,
        method: "POST",
        body,
      })},
      invalidatesTags: ["course-materials"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast({
            type: "success",
            message: "Uploaded material successfully",
          });
        } catch (err) {
          toast({
            type: "error",
            message: "something went wrong",
          });
        }
      },
    }),
    attachmentUploadFinish: builder.mutation({
      query: (body) => {
        console.log(body)
        return ({
        url: `attachment/finish_upload`,
        method: "POST",
        body,
      })},
      invalidatesTags: ["submissions"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast({
            type: "success",
            message: "Uploaded attachment successfully",
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
  useGetAccountInformationQuery,
  useEditSubmissionMutation,
  useEditProfileMutation,
  useGetCourseMaterialsQuery,
  useDirectUploadStartMutation,
  useDirectUploadFinishMutation,
  useGetSingleAssignmentQuery,
  useAttachmentUploadFinishMutation
} = otherAPI;
