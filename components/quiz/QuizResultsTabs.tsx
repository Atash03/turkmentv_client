import { Question } from "@/models/quizQuestions.model";
import React from "react";

interface IQuizTabProps {
  steps: {
    tapgyr: number;
    questions: Question[];
  }[];
  setStep: React.Dispatch<React.SetStateAction<number | string>>;
  tab: number | string;
}

function QuizResultsTabs({ steps, setStep, tab }: IQuizTabProps) {
  return (
    <div className="flex gap-[10px] w-full md:w-1/2 self-center">
      {steps.map((item) => (
        <button
          onClick={() => {
            setStep(item.tapgyr - 1);
          }}
          key={item.tapgyr}
          className={`flex-1 py-[5px] rounded-lg transition-all duration-300 ${
            tab === item.tapgyr - 1
              ? "bg-lightPrimary text-white"
              : "bg-lightPrimaryContainer text-textLight"
          }`}
        >
          {item.tapgyr}
        </button>
      ))}
      <button
        onClick={() => {
          setStep("results");
        }}
        className={`flex-1 py-[5px] rounded-lg transition-all duration-300 ${
          tab === "results"
            ? "bg-lightPrimary text-white"
            : "bg-lightPrimaryContainer text-textLight"
        }`}
      >
        Netije
      </button>
    </div>
  );
}

export default QuizResultsTabs;
