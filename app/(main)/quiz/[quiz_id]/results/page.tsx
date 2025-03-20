"use client";
import { Queries } from "@/api/queries";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizResultsSearch from "@/components/quiz/QuizResultsSearch";
import QuizResultsTabs from "@/components/quiz/QuizResultsTabs";
import QuizTapgyrResults from "@/components/quiz/QuizTapgyrResults";
import QuizTapgyrWinners from "@/components/quiz/QuizTapgyrWinners";
import { Data } from "@/models/quizQuestions.model";
import { useQuizResults } from "@/store/store";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IParams {
  params: {
    quiz_id: string;
  };
}

const Page = ({ params }: IParams) => {
  const [data, setData] = useState<Data>();
  const [tab, setTab] = useState<number | string>(0);
  const { resultData, error } = useQuizResults();

  useEffect(() => {
    if (!resultData.length && !error) {
      Queries.getQuizById(params.quiz_id)
        .then((res) => setData(res.data))
        .catch(() => notFound());
    }
  }, [resultData, error]);

  return (
    <section className="container py-[40px]">
      <div className="flex flex-col w-full py-[40px] gap-[80px]">
        <QuizHeader data={data} />
        <QuizResultsSearch id={params.quiz_id} />
        <QuizResultsTabs
          steps={data?.steps ? data?.steps : []}
          tab={tab}
          setStep={setTab}
        />
        {tab === "results" && (
          <QuizTapgyrResults
            id={params.quiz_id}
            steps={
              data?.steps ? data?.steps?.map((item) => String(item.tapgyr)) : []
            }
          />
        )}
        {data?.has_steps &&
          data.steps &&
          data.steps?.length > 0 &&
          tab !== "results" && (
            <QuizTapgyrWinners
              key={data.steps[Number(tab)].tapgyr}
              id={params.quiz_id}
              tapgyr={data.steps[Number(tab)].tapgyr}
              questions={data.steps[Number(tab)].questions}
            />
          )}
      </div>
    </section>
  );
};

export default Page;
