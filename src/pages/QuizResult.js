import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import QuizListItem from "../components/QuizListItem";
import { Button } from "@material-tailwind/react";

export default function QuizResult() {
  const quizzies = useSelector((state) => state.quiz.quizzies);

  let renderedQuizzes;

  if (!quizzies || quizzies.length === 0) {
    renderedQuizzes = (
      <div>
        <div className="font-bold">Please take a Quiz first</div>
        <Link className="underline hover:text-gray-500" to={"/"}>
          Click here to take a quiz
        </Link>
      </div>
    );
  } else {
    renderedQuizzes = quizzies.map((quiz) => {
      return (
        <QuizListItem
          key={quiz.question}
          options={quiz.options}
          question={quiz.question}
          correctOption={quiz.correct_answer}
          selectedOption={quiz.selected_answer}
        ></QuizListItem>
      );
    });
  }

  const numberOfScore = quizzies.reduce((total, currentValue) => {
    if (currentValue.correct_answer === currentValue.selected_answer) {
      return total + 1;
    }
    return total;
  }, 0);

  let renderedScoreClass = "w-40 mx-auto px-2 ";
  if (numberOfScore < 2) {
    renderedScoreClass += "bg-red-500";
  } else if (numberOfScore === 2 || numberOfScore === 3) {
    renderedScoreClass += "bg-yellow-500";
  } else {
    renderedScoreClass += "bg-green-500";
  }
  const renderedScore = (
    <div className={renderedScoreClass}>You score {numberOfScore} out of 5</div>
  );


  return (
    <div className="flex flex-col items-center py-5 px-10 gap-6">
      <h1 className="font-bold text-2xl">Quiz Result</h1>
      <div className="w-full">{renderedQuizzes}</div>
      <div className="w-full">{quizzies.length !== 0 ? renderedScore : ""}</div>
      <div className="w-full flex justify-center">
        {quizzies.length !== 0 ? (
          <Link to={"/"}>
            <Button className="mx-auto w-64" color="gray">
              Create a new Quiz
            </Button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
