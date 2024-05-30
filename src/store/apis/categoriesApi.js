import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../utils/constanst";

const categoriesApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchCategories: builder.query({
        query: () => {
          return {
            url: "/api_category.php",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchCategoriesQuery } = categoriesApi;
export { categoriesApi };
