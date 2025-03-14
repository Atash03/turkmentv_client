"use client";
import { Queries } from "@/api/queries";
import QuizHeader from "@/components/quiz/QuizHeader";
import QuizResultsSearch from "@/components/quiz/QuizResultsSearch";
import QuizTapgyrResults from "@/components/quiz/QuizTapgyrResults";
import QuizTapgyrWinners from "@/components/quiz/QuizTapgyrWinners";
import { Data } from "@/models/quizQuestions.model";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";

interface IParams {
  params: {
    quiz_id: string;
  };
}

const Page = ({ params }: IParams) => {
  const [data, setData] = useState<Data>();

  useEffect(() => {
    Queries.getQuizById(params.quiz_id)
      .then((res) => setData(res.data))
      .catch(() => notFound());
  }, []);

  return (
    <section className="container py-[40px]">
      <div className="flex flex-col w-full py-[40px] gap-[80px]">
        <QuizHeader data={data} />
        <QuizResultsSearch id={params.quiz_id} />
        <QuizTapgyrResults
          id={params.quiz_id}
          steps={
            data?.steps ? data?.steps?.map((item) => String(item.tapgyr)) : []
          }
        />
        {data?.has_steps &&
          data.steps &&
          data.steps?.length > 0 &&
          data.steps.map((step) => (
            <QuizTapgyrWinners
              key={step.tapgyr}
              id={params.quiz_id}
              tapgyr={step.tapgyr}
              questions={step.questions}
            />
          ))}
      </div>
    </section>
  );
};

export default Page;
