import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constanst";

const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchQuiz: builder.query({
        query: (params) => {
          return {
            url: "/api.php?amount=5&type=multiple",
            params: {
              category: params.category,
              difficulty: params.difficulty
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchQuizQuery, useLazyFetchQuizQuery } = quizApi;
export { quizApi };
