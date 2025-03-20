import React, { useContext } from "react";
import QuizAccordion from "./QuizAccordion";
import { Validator } from "@/utils/validator";
import QuizContext from "@/context/QuizContext";
import { v4 } from "uuid";

type TProps = {
  finished: string;
  question: string;
  startsAt: string;
  endsAt: string;
  questionId: number;
  questionNumber: number;
  score: number;
};

const numbers = [
  "Birinji sowal",
  "Ikinji sowal",
  "Üçünji sowal",
  "Dördünji sowal",
  "Bäşinji sowal",
  "Altynjy sowal",
  "Ýedinji sowal",
  "Sekizinji sowal",
  "Dokuzynjy sowal",
  "Onunjy sowal",
  "On Birinji sowal",
  "On Ikinji sowal",
  "On Üçünji sowal",
  "On Dördünji sowal",
  "On Bäşinji sowal",
  "On Altynji sowal",
  "On Ýeddi sowal",
  "On Sekiznji sowal",
  "On Dokuzunji sowal",
  "Ýigrinci sowal",
];

const QuizQuestion = ({
  finished,
  question,
  startsAt,
  endsAt,
  questionId,
  questionNumber,
  score,
}: TProps) => {
  const { quizSearchData } = useContext(QuizContext).quizSearchContext;
  return quizSearchData ? (
    Object.values(quizSearchData.data).map((userQuestion, id) =>
      userQuestion.question_id === questionId ? (
        <div className="flex flex-col gap-[20px]" key={v4()}>
          <div className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[20px] md:gap-[10px]">
              <h2 className="text-[24px] md:text-[32px] leading-[120%] font-semibold text-textBlack">
                {question}
              </h2>

              <div className="flex flex-wrap justify-center md:justify-start md:gap-5 gap-[10px]">
                <div className="flex gap-2 items-center">
                  <div
                    className={`w-[18px] h-[18px] md:w-4 md:h-4 ${
                      finished === "closed" ? "bg-fillRed" : "bg-fillGreen"
                    } rounded-full`}
                  ></div>
                  <span className="text-textLight text-sm md:text-base">
                    {finished === "closed" ? "ýapyk" : "açyk"}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M7.99967 13.3334C10.933 13.3334 13.333 10.9334 13.333 8.00004C13.333 5.06671 10.933 2.66671 7.99967 2.66671C5.06634 2.66671 2.66634 5.06671 2.66634 8.00004C2.66634 10.9334 5.06634 13.3334 7.99967 13.3334ZM7.99967 1.33337C11.6663 1.33337 14.6663 4.33337 14.6663 8.00004C14.6663 11.6667 11.6663 14.6667 7.99967 14.6667C4.33301 14.6667 1.33301 11.6667 1.33301 8.00004C1.33301 4.33337 4.33301 1.33337 7.99967 1.33337ZM10.1997 10.8L9.33301 11.3334L7.33301 7.86671V4.66671H8.33301V7.60004L10.1997 10.8Z"
                      fill="#878799"
                    />
                  </svg>
                  <span className="text-textLight text-sm md:text-base">
                    {Validator.parseDate(startsAt)}-den{" "}
                    {Validator.parseDate(endsAt)}-e çenli
                  </span>
                </div>
                <div className="flex items-center gap-[5px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M9 5.25C8.5875 5.25 8.25 5.5875 8.25 6V8.25H6C5.5875 8.25 5.25 8.5875 5.25 9C5.25 9.4125 5.5875 9.75 6 9.75H8.25V12C8.25 12.4125 8.5875 12.75 9 12.75C9.4125 12.75 9.75 12.4125 9.75 12V9.75H12C12.4125 9.75 12.75 9.4125 12.75 9C12.75 8.5875 12.4125 8.25 12 8.25H9.75V6C9.75 5.5875 9.4125 5.25 9 5.25ZM9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                      fill="#878799"
                    />
                  </svg>
                  <span className="text-textLight text-sm md:text-base">
                    Dogry jogap üçin +{score} utuk
                  </span>
                </div>
              </div>
            </div>
          </div>

          {finished === "closed" ? (
            <QuizAccordion finished={finished} questionId={questionId} />
          ) : null}
        </div>
      ) : null
    )
  ) : (
    <div className="flex flex-col gap-[20px]">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[20px] md:gap-[10px]">
          <h2 className="text-[18px] md:text-[32px] leading-[120%] font-semibold text-textBlack">
            {question}
          </h2>

          <div className="flex flex-wrap justify-center md:justify-start md:gap-5 gap-[10px]">
            <div className="flex gap-2 items-center">
              <div
                className={`w-[18px] h-[18px] md:w-4 md:h-4 ${
                  finished === "closed" ? "bg-fillRed" : "bg-fillGreen"
                } rounded-full`}
              ></div>
              <span className="text-textLight text-sm md:text-base">
                {finished === "closed" ? "ýapyk" : "açyk"}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M7.99967 13.3334C10.933 13.3334 13.333 10.9334 13.333 8.00004C13.333 5.06671 10.933 2.66671 7.99967 2.66671C5.06634 2.66671 2.66634 5.06671 2.66634 8.00004C2.66634 10.9334 5.06634 13.3334 7.99967 13.3334ZM7.99967 1.33337C11.6663 1.33337 14.6663 4.33337 14.6663 8.00004C14.6663 11.6667 11.6663 14.6667 7.99967 14.6667C4.33301 14.6667 1.33301 11.6667 1.33301 8.00004C1.33301 4.33337 4.33301 1.33337 7.99967 1.33337ZM10.1997 10.8L9.33301 11.3334L7.33301 7.86671V4.66671H8.33301V7.60004L10.1997 10.8Z"
                  fill="#878799"
                />
              </svg>
              <span className="text-textLight text-sm md:text-base">
                {Validator.parseDate(startsAt)}-den{" "}
                {Validator.parseDate(endsAt)}-e çenli
              </span>
            </div>
            <div className="flex items-center gap-[5px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 5.25C8.5875 5.25 8.25 5.5875 8.25 6V8.25H6C5.5875 8.25 5.25 8.5875 5.25 9C5.25 9.4125 5.5875 9.75 6 9.75H8.25V12C8.25 12.4125 8.5875 12.75 9 12.75C9.4125 12.75 9.75 12.4125 9.75 12V9.75H12C12.4125 9.75 12.75 9.4125 12.75 9C12.75 8.5875 12.4125 8.25 12 8.25H9.75V6C9.75 5.5875 9.4125 5.25 9 5.25ZM9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                  fill="#878799"
                />
              </svg>
              <span className="text-textLight text-sm md:text-base">
                Dogry jogap üçin +{score} utuk
              </span>
            </div>
          </div>
        </div>
      </div>

      {finished === "closed" ? (
        <QuizAccordion finished={finished} questionId={questionId} />
      ) : null}
    </div>
  );
};

export default QuizQuestion;
