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
  const [loading, setLoading] = useState<boolean>(false);
  const { resultData, error } = useQuizResults();

  useEffect(() => {
    const local_info = sessionStorage.getItem("TURKMENTV_QUIZ_RESULTS");
    if (!resultData.length && !error) {
      setLoading(true);
      Queries.getQuizById(params.quiz_id)
        .then((res) => {
          setData(res.data);
          if (res.data.steps?.length) {
            if (local_info) {
              if (
                JSON.parse(local_info)?.tab &&
                JSON.parse(local_info)?.uuid === res.data.uuid
              ) {
                setTab(JSON.parse(local_info)?.tab);
              } else {
                setTab(res.data?.steps[res.data?.steps.length - 1].tapgyr - 1);
              }
            } else {
              setTab(res.data?.steps[res.data?.steps.length - 1].tapgyr - 1);
            }
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          notFound();
        });
    }
  }, [resultData, error]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem(
        "TURKMENTV_QUIZ_RESULTS",
        JSON.stringify({
          uuid: data?.uuid,
          tab: tab,
        })
      );
    }
  }, [data, tab]);

  return (
    <section className="container py-[40px]">
      <div className="flex flex-col w-full py-[40px] gap-[80px]">
        <QuizHeader data={data} />
        <QuizResultsSearch id={params.quiz_id} />
        <QuizResultsTabs
          steps={data?.steps ? data?.steps : []}
          tab={tab}
          setStep={setTab}
          loading={loading}
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
