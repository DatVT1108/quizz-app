import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { categoriesApi } from "./apis/categoriesApi";
import { quizApi } from "./apis/quizApi";
import quizSlice from "./slices/quizSlice";

export const store = configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    quiz: quizSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(categoriesApi.middleware).concat(quizApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useFetchCategoriesQuery } from "./apis/categoriesApi";
export { useFetchQuizQuery, useLazyFetchQuizQuery } from "./apis/quizApi";