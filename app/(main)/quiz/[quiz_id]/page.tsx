"use client";

import { Queries } from "@/api/queries";
import Loader from "@/components/Loader";
import QuizQuestionList from "@/components/quiz/QuizQuestionList";
import QuizSearch from "@/components/quiz/QuizSearch";
import QuizTable from "@/components/quiz/QuizTable";
import QuizWinnerTable from "@/components/quiz/QuizWinnerTable";
import GradientTitle from "@/components/vote/GradientTitle";
import { IQuizQuestions } from "@/models/quizQuestions.model";
import QuizProvider from "@/providers/QuizProvider";
import { useQuizSearchActive, useSteps } from "@/store/store";
import { Validator } from "@/utils/validator";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface IParams {
  params: {
    quiz_id: string;
  };
}

const page = ({ params }: IParams) => {
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [data, setData] = useState<IQuizQuestions>();
  const { active } = useQuizSearchActive();
  const { step, setStep } = useSteps();

  useEffect(() => {
    if (!params.quiz_id) {
      Queries.getQuizQuestions().then((res) => {
        setData(res);
        if (res.data.questions) {
          res.data.questions.map((question) =>
            question.status === "active" || question.status === "new"
              ? setQuizFinished(false)
              : setQuizFinished(true)
          );
        } else if (res.data.steps && res.data.steps?.length > 0) {
          setStep(res.data.steps[0].tapgyr);
          for (let i = 0; i < res.data.steps.length; i++) {
            res.data.steps[i].questions.map((question) =>
              question.status === "active" || question.status === "new"
                ? setQuizFinished(false)
                : setQuizFinished(true)
            );
          }
        }
      });
    } else {
      Queries.getQuiz(params.quiz_id).then((res) => {
        setData(res);
        if (res.data.questions) {
          res.data.questions.map((question) =>
            question.status === "active" || question.status === "new"
              ? setQuizFinished(false)
              : setQuizFinished(true)
          );
        } else if (res.data.steps && res.data.steps?.length > 0) {
          setStep(res.data.steps[0].tapgyr);
          for (let i = 0; i < res.data.steps.length; i++) {
            res.data.steps[i].questions.map((question) =>
              question.status === "active" || question.status === "new"
                ? setQuizFinished(false)
                : setQuizFinished(true)
            );
          }
        }
      });
    }
  }, []);

  const mobile = useMediaQuery("(max-width: 768px)");

  if (data) {
    if (!data.data) {
      return (
        <main className="h-full py-[200px]">
          <div className="container">
            <GradientTitle title={data?.message} size="big" />
          </div>
        </main>
      );
    }

    return (
      <main className="pt-[60px] pb-[200px]">
        {typeof data !== "string" ? (
          <div className="container flex flex-col md:gap-[200px] gap-[80px]">
            <QuizProvider>
              <div className="flex flex-col gap-[100px]">
                <div className="flex flex-col gap-[45px]">
                  <div className="flex flex-col gap-[10px] md:gap-[5px]">
                    <h3 className="text-base md:text-[14px] text-textLight font-semibold md:font-normal">
                      {data ? Validator.reveseDate(data?.data.date) : null}
                    </h3>
                    <h1 className="text-textBlack text-[32px] md:text-[60px] leading-[100%] font-semibold">
                      {data?.data.title}
                    </h1>
                    <h3 className="text-base font-medium leading-[125%] md:text-[14px] text-textDarkt mt-[5px] max-w-[600px]">
                      {data?.data.description}
                    </h3>
                  </div>
                  {data?.data.banner ? (
                    <div className="relative w-full md:min-h-[150px] md:h-auto h-[100px]">
                      {mobile ? (
                        <Image
                          src={
                            data.data.banner_mobile !== null
                              ? data.data.banner_mobile
                              : data.data.banner
                          }
                          alt={"banner"}
                          unoptimized
                          unselectable="off"
                          fill
                          className="rounded-[8px]"
                        />
                      ) : (
                        <Image
                          src={data?.data.banner}
                          alt={"banner"}
                          unoptimized
                          unselectable="off"
                          fill
                          className="rounded-[8px]"
                        />
                      )}
                    </div>
                  ) : null}
                </div>

                {data?.data.rules && data.data.notes ? (
                  <QuizTable
                    rules={data?.data.rules}
                    notes={data?.data.notes}
                  />
                ) : null}
              </div>

              <div className="flex flex-col md:gap-[160px] gap-[80px]">
                {data.data.has_steps !== 0 &&
                  data.data.steps &&
                  data.data.steps?.length > 0 && (
                    <div className="flex flex-col gap-4 items-center w-full">
                      <h1 className="text-textBlack md:text-[60px] leading-[100%] font-semibold">
                        Tapgyr
                      </h1>
                      <div className="flex w-full md:w-1/2 gap-[10px]">
                        {data.data.steps.map((item) => (
                          <button
                            onClick={() => {
                              setStep(item.tapgyr);
                            }}
                            key={item.tapgyr}
                            className={`flex-1 py-[5px] rounded-lg transition-all duration-300 ${
                              step === item.tapgyr
                                ? "bg-lightPrimary text-white"
                                : "bg-lightPrimaryContainer text-textLight"
                            }`}
                          >
                            {item.tapgyr}
                          </button>
                        ))}
                        <Link
                          href={`/quiz/${params.quiz_id}/results`}
                          className={`flex-1 py-[5px] rounded-lg transition-all duration-300 bg-lightPrimaryContainer text-center text-textLight`}
                        >
                          Netije
                        </Link>
                      </div>
                    </div>
                  )}

                {data?.data && !active ? (
                  <QuizQuestionList
                    paramsId={params.quiz_id}
                    initialQuestionsData={data}
                    setQuizFinished={setQuizFinished}
                    quizFinished={quizFinished}
                  />
                ) : null}

                {data?.data.id && quizFinished && data.data.has_steps === 0 ? (
                  <QuizSearch quizId={data?.data.id} />
                ) : null}

                {data?.data.id && data.data.has_steps === 0 && (
                  <QuizWinnerTable
                    quizId={data?.data.id}
                    questionsData={data.data.questions}
                  />
                )}
              </div>
            </QuizProvider>
          </div>
        ) : (
          <div className="container text-[40px] flex items-center justify-center font-bold text-textLight min-h-[30vh]">
            Непредвиденная ошибка. Нет активной викторины.
          </div>
        )}
      </main>
    );
  } else {
    return (
      <main className="h-full py-[200px]">
        <div className="container">
          <Loader />
        </div>
      </main>
    );
  }
};

export default page;
