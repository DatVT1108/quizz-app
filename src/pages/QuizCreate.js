import { Select, Option } from "@material-tailwind/react";
import { useState } from "react";
import QuizList from "../components/QuizList";
import { useFetchCategoriesQuery, useLazyFetchQuizQuery } from "../store";
import { DIFFICULTY_SELECT_LIST } from "../utils/constanst";

export default function QuizCreate() {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [isChoosedCategory, setIsChoosedCategory] = useState(true);
  const [isChoosedDifficulty, setIsChoosedDifficulty] = useState(true);

  let renderedCategories;
  let renderedDifficulties = DIFFICULTY_SELECT_LIST.map((difficulty) => {
    return (
      <Option value={difficulty.value} key={difficulty.value}>
        {difficulty.option}
      </Option>
    );
  });

  const { data, error, isLoading } = useFetchCategoriesQuery();

  if (isLoading) {
    renderedCategories = <div>Loading category</div>;
  } else if (error) {
    renderedCategories = <div>Error load category</div>;
  } else {
    renderedCategories = data.trivia_categories.map((category) => {
      return (
        <Option value={`` + category.id} key={category.id}>
          {category.name}
        </Option>
      );
    });
  }

  const [fetchQuiz, fetchQuizResult] = useLazyFetchQuizQuery();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (!category) {
      setIsChoosedCategory(false);
      isValid = false;
    }

    if (!difficulty) {
      setIsChoosedDifficulty(false);
      isValid = false;
    }

    if (isValid) {
      fetchQuiz({
        category,
        difficulty,
      });
    }
  };

  return (
    <div className="flex flex-col items-center py-5 px-10">
      <h1 className="font-bold text-2xl">Quiz Create</h1>
      <form
        className="w-full flex flex-row gap-2 py-4"
        onSubmit={handleSubmit}
      >
        <div className="w-full h-16">
          <Select
            label="Select category"
            onChange={(val) => {
              setCategory(val || "");
              setIsChoosedCategory(true);
            }}
            name="category"
            id="categorySelect"
            error={!isChoosedCategory}
          >
            {renderedCategories}
          </Select>
          {!isChoosedCategory ? <p className="text-sm text-red-600">Please choose a category</p> : ''}
        </div>
        <div className="w-full h-16">
          <Select
            label="Select difficulty"
            onChange={(val) => {
              setDifficulty(val || "");
              setIsChoosedDifficulty(true);
            }}
            id="difficultySelect"
            error={!isChoosedDifficulty}
          >
            {renderedDifficulties}
          </Select>
          {!isChoosedDifficulty ? <p className="text-sm text-red-600">Please choose a difficulty</p> : ''}
        </div>
        <button
          className="h-10 w-20 px-4 rounded-lg border border-gray-600 hover:bg-gray-200"
          id="createBtn"
          type="submit"
        >
          Create
        </button>
      </form>
      {!fetchQuizResult.isUninitialized && (
        <QuizList
          isLoading={fetchQuizResult?.isLoading || fetchQuizResult?.isFetching}
          isError={fetchQuizResult?.isError}
          quizzes={fetchQuizResult?.data?.results}
        />
      )}
    </div>
  );
}
