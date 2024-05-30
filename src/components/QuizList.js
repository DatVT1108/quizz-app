import QuizListItem from "./QuizListItem";
import Loading from "../components/Loading";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {shuffleArray} from "../utils/shuffleArray"
import { useDispatch } from "react-redux";
import { setQuizzies } from "../store/slices/quizSlice";

export default function QuizList({ isLoading, isError, quizzes }) {
  // Navigation
  const navigate = useNavigate();

  // Dispatcher
  const dispatch = useDispatch()

  // Handle selected options
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionSelect = (index, option) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [index]: option,
    }));
  };

  let selectedCount = Object.keys(selectedOptions).length;

  // Handling random options
  const [quizWithRandomOptions, setQuizWithRandomOptions] = useState([]);

  useEffect(() => {
    if (quizzes && quizzes.length !== 0) {
      setQuizWithRandomOptions(() => {
        const newQuizzes = [];
  
        for (const quiz of quizzes) {
          const options = [quiz.correct_answer, ...quiz.incorrect_answers];
          const shuffledOptions = shuffleArray(options);
          newQuizzes.push(shuffledOptions);
        }
  
        return newQuizzes;
      });
    }

    return () => setSelectedOptions({});
  }, [quizzes])

  // Render quizzies
  let renderedQuizzes;

  if (isLoading) {
    renderedQuizzes = <Loading></Loading>;
  } else if (isError) {
    renderedQuizzes = <div>Error loading quizzes</div>;
  } else {
    renderedQuizzes = quizzes.map((quiz, index) => {
      return (
        <QuizListItem
          options={quizWithRandomOptions[index]}
          question={quiz.question}
          key={index}
          selectedOption={selectedOptions[index] || null}
          setSelectedOption={(option) => handleOptionSelect(index, option)}
        ></QuizListItem>
      );
    });
  }

  // Handle submit
  const handleSubmitQuiz = () => {
    // Save into store
    const quizziesWithRandomOptions = quizzes.map((quiz, index) => {
      return {...quiz, options: quizWithRandomOptions[index], selected_answer: selectedOptions[index] }
    })
    dispatch(setQuizzies(quizziesWithRandomOptions))

    // Navigate into result page
    navigate("/result");
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {renderedQuizzes}
      <div className="flex">
        {(selectedCount === quizzes?.length) && (
          <Button className="mt-4 mx-auto bg-gray-800 w-28" onClick={handleSubmitQuiz}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
}
