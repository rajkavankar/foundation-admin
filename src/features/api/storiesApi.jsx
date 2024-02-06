import { apiSlice } from "./apiSlice"

const STORIES_URL = "http://localhost:5000/api/stories"

export const stroiesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createStory: builder.mutation({
      query: (data) => ({
        url: `${STORIES_URL}`,
        method: "POST",
        body: data,
      }),
    }),
    getStories: builder.query({
      query: () => ({
        url: `${STORIES_URL}`,
        method: "GET",
      }),
    }),
  }),
})

export const { useCreateStoryMutation, useGetStoriesQuery } = stroiesApi
