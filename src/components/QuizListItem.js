import { Button } from "@material-tailwind/react";
import he from "he";
import Loading from "./Loading";

export default function QuizListItem({
  options,
  question,
  selectedOption,
  setSelectedOption,
  correctOption,
}) {
  let renderedOptions;

  if (!options || options.length === 0) {
    renderedOptions = <Loading />;
  } else {
    renderedOptions = options.map((option) => {
      let optionClass = "h-10";
      optionClass +=
        selectedOption === option ? " bg-green-300 text-white" : "";
      if (correctOption) {
        if (correctOption === option) {
          optionClass += " bg-green-500 text-white";
        } 

        if(correctOption !== selectedOption && selectedOption === option) {
          optionClass += " bg-red-500 text-white";
        }
      }
      return (
        <Button
          className={optionClass}
          variant="outlined"
          color="green"
          key={option}
          onClick={setSelectedOption ? () => setSelectedOption(option) : undefined}
        >
          {he.decode(option)}
        </Button>
      );
    });
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="font-bold text-xl">{he.decode(question)}</p>
      <div className="flex flex-row gap-2 items-center justify-start">
        {renderedOptions}
      </div>
    </div>
  );
}
