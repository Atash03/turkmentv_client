"use client";
import QuizQuestion from "./QuizQuestion";
import { Queries } from "@/api/queries";
import { v4 } from "uuid";
import { Dispatch, useContext, useEffect, useState } from "react";
import { IQuizQuestions, Question } from "@/models/quizQuestions.model";
import QuizContext from "@/context/QuizContext";
import { useSteps } from "@/store/store";

interface IProps {
  setQuizFinished: Dispatch<boolean>;
  quizFinished: boolean;
  initialQuestionsData: IQuizQuestions;
  paramsId?: string;
}

const QuizQuestionList = ({
  setQuizFinished,
  quizFinished,
  initialQuestionsData,
  paramsId,
}: IProps) => {
  const { quizSearchData } = useContext(QuizContext).quizSearchContext;
  const { step } = useSteps();
  const [questionData, setQuestionsData] = useState<Question[] | undefined>(
    initialQuestionsData.data.questions
      ? initialQuestionsData.data.questions
      : initialQuestionsData.data.steps
      ? initialQuestionsData.data.steps[0].questions
      : []
  );

  useEffect(() => {
    if (paramsId && !quizFinished) {
      const interval = setInterval(() => {
        Queries.getQuiz(paramsId).then((res) => {
          if (res.data.questions) {
            setQuestionsData(res.data.questions);
            res.data.questions.map((question) =>
              question.status === "active" || question.status === "new"
                ? setQuizFinished(false)
                : setQuizFinished(true)
            );
          } else if (res.data.steps && res.data.steps?.length > 0) {
            setQuestionsData(res.data.steps[0].questions);
            for (let i = 0; i < res.data.steps.length; i++) {
              res.data.steps[i].questions.map((question) =>
                question.status === "active" || question.status === "new"
                  ? setQuizFinished(false)
                  : setQuizFinished(true)
              );
            }
          }
        });
      }, 60000);
      return () => clearInterval(interval);
    }

    if (!paramsId && !quizFinished) {
      const interval = setInterval(() => {
        Queries.getQuizQuestions().then((res) => {
          if (res.data.questions) {
            setQuestionsData(res.data.questions);
            res.data.questions.map((question) =>
              question.status === "active" || question.status === "new"
                ? setQuizFinished(false)
                : setQuizFinished(true)
            );
          } else if (res.data.steps && res.data.steps?.length > 0) {
            setQuestionsData(res.data.steps[0].questions);
            for (let i = 0; i < res.data.steps.length; i++) {
              res.data.steps[i].questions.map((question) =>
                question.status === "active" || question.status === "new"
                  ? setQuizFinished(false)
                  : setQuizFinished(true)
              );
            }
          }
        });
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [quizFinished]);

  useEffect(() => {
    if (initialQuestionsData.data.steps) {
      const tapgyrQuestions = initialQuestionsData.data.steps.find(
        (item) => item.tapgyr === step
      );
      setQuestionsData(tapgyrQuestions?.questions);
    }
  }, [step]);

  return (
    <div className="flex flex-col gap-[40px] md:gap-[160px]">
      {quizSearchData && Object.values(quizSearchData.data).length === 0 ? (
        <h2 className="text-textDarkt text-center text-[28px] ms:text-[32px] flex items-center justify-center bg-fillBGBlockbg px-[20px] py-[40px] md:px-[40px] md:py-[80px] rounded-[24px]">
          Вы не участвовали ни в одном вопросе
        </h2>
      ) : questionData ? (
        questionData.map((question, id) =>
          question.status !== "new" ? (
            <QuizQuestion
              score={question.score}
              questionId={question.id}
              questionNumber={id}
              finished={question.status}
              question={question.question}
              key={v4()}
              startsAt={question.starts_at}
              endsAt={question.ends_at}
            />
          ) : null
        )
      ) : null}
    </div>
  );
};

export default QuizQuestionList;
