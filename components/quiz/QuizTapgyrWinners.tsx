"use client";
import { getNextQuizWinnners, getQuizWinnersById } from "@/api/queries";
import { Question } from "@/models/quizQuestions.model";
import {
  Datum,
  ISearchNetije,
} from "@/models/quizQuestionsWinners.model";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useQuizResults, useResultsLoading } from "@/store/store";

const padding = "py-4";

interface IProps {
  id: string;
  tapgyr: number;
  questions: Question[];
}

const QuizTapgyrWinners = ({ id, tapgyr, questions }: IProps) => {
  const [data, setData] = useState<Datum[] | ISearchNetije[]>([]);
  const { error, resultData } = useQuizResults();
  const [loading, setLoading] = useState<boolean>(false);
  const searchLoading = useResultsLoading((state) => state.loading);
  const [total, setTotal] = useState<number>(0);
  const [nextPageQueries, setQueries] = useState<{
    limit: number;
    offset: number;
  }>({
    limit: 0,
    offset: 0,
  });

  async function getData(next?: boolean) {
    if (next) {
      const res = await getNextQuizWinnners(
        Number(id),
        nextPageQueries.limit,
        nextPageQueries.offset,
        tapgyr
      );
      if (res) {
        setQueries({
          limit: res.meta.per_page,
          offset: nextPageQueries.offset + res.meta.per_page,
        });
        setData([...(data as Datum[]), ...res.data]);
      }
    } else {
      setLoading(true);
      const res = await getQuizWinnersById(Number(id), tapgyr);
      if (res) {
        setTotal(res.meta.total);
        setQueries({
          limit: res.meta.per_page,
          offset: res.meta.per_page,
        });
        setData(res.data);
        setLoading(false);
      } else {
        notFound();
      }
    }
  }

  useEffect(() => {
    if (!resultData.length && !error) {
      getData();
    } else if (resultData.length) {
      setData(resultData);
      setTotal(0);
    } else if (error) {
      setTotal(0);
      setData([]);
    }
  }, [resultData]);

  return (
    <article className="flex flex-col gap-[24px]">
      <header className="flex justify-center">
        <h1 className="text-[28px] text-[#1B1B21] md:text-[36px]">
          Gepleşik {tapgyr}
        </h1>
      </header>
      {data.length > 0 && !loading && !searchLoading ? (
        <table className="bg-[#F6F2FA] rounded-[12px] overflow-hidden">
          <thead className="bg-[#EAE7EF] p-[20px]">
            <tr>
              {((data[0] as Datum).client_id ||
                (data[0] as ISearchNetije).place) && (
                <th scope="col" className={`${padding} text-center`}>
                  Ýeri
                </th>
              )}
              {data[0].phone && (
                <th scope="col" className={`${padding} text-center`}>
                  Telefon beligisi
                </th>
              )}
              {((data[0] as Datum).answers?.length > 0 ||
                (data[0] as ISearchNetije).tapgyr_breakdown?.length) && (
                <th
                  scope="col"
                  className={`${padding} text-center hidden md:inline-block md:w-full`}
                >
                  Jogap beriş nobatlary
                </th>
              )}
              {((data[0] as Datum).correct_answers_time ||
                (data[0] as ISearchNetije).total_nobat) && (
                <th scope="col" className={`${padding} text-center`}>
                  Nobatlaryň jemi
                </th>
              )}
              {((data[0] as Datum).total_score_of_client ||
                (data[0] as ISearchNetije).total_score) && (
                <th scope="col" className={`${padding} text-center`}>
                  Utuklaryň jemi
                </th>
              )}
            </tr>
          </thead>
          <tbody className=" text-[#46464F]">
            {data.map((winner, id) => (
              <React.Fragment key={id}>
                <tr
                  className={`${
                    id !== data.length - 1 && "md:border-b md:border-[#C7C5D0]"
                  }`}
                >
                  {/* Yeri */}
                  <th scope="row" className={`${padding} text-center`}>
                    {id > 0 &&
                    (winner as Datum).correct_answers_time ===
                      (data[id - 1] as Datum).correct_answers_time
                      ? id
                      : (winner as ISearchNetije).tapgyr_breakdown
                      ? (winner as ISearchNetije).tapgyr_breakdown.find(
                          (item) => item.tapgyr === tapgyr
                        )?.tapgyr_place
                      : id + 1}
                  </th>
                  {/* Phone number */}
                  <td className={`${padding} text-center`}>
                    +{winner.phone ? winner.phone : "-"}
                  </td>
                  {/* Jogap berish nobaty */}
                  <td className={`${padding} hidden md:block`}>
                    <div className="w-full flex gap-[5px] justify-center">
                      {questions.map((question) => {
                        const matchingAnswer =
                          (winner as Datum).answers?.find(
                            (answer) =>
                              answer.question_id === question.id &&
                              answer.score > 0
                          ) ||
                          (winner as Datum).answers?.find(
                            (answer) => answer.question_id === question.id
                          ) ||
                          ((winner as ISearchNetije).tapgyr_breakdown &&
                            (winner as ISearchNetije).tapgyr_breakdown
                              .find((step) => step.tapgyr === tapgyr)
                              ?.answers.find(
                                (answer) =>
                                  answer.question_id === question.id &&
                                  answer.score > 0
                              )) ||
                          ((winner as ISearchNetije).tapgyr_breakdown &&
                            (winner as ISearchNetije).tapgyr_breakdown
                              .find((step) => step.tapgyr === tapgyr)
                              ?.answers.find(
                                (answer) => answer.question_id === question.id
                              ));

                        return (
                          <span
                            key={question.id}
                            className={`text-sm font-semibold leading-[125%] ${
                              matchingAnswer &&
                              matchingAnswer.serial_number_for_correct !== 0
                                ? "text-fillGreen"
                                : matchingAnswer &&
                                  matchingAnswer?.serial_number_for_correct ===
                                    0
                                ? "text-fillRed"
                                : "text-textLight"
                            }`}
                          >
                            {matchingAnswer && matchingAnswer.score !== 0 ? (
                              matchingAnswer.serial_number_for_correct
                            ) : matchingAnswer &&
                              matchingAnswer?.score === 0 ? (
                              "X"
                            ) : (
                              <span className="text-[20px]">-</span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  {/* Answer time */}
                  <td className={`${padding}`}>
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%] w-[100%]">
                      <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                        {(winner as Datum).correct_answers_time
                          ? (winner as Datum).correct_answers_time
                          : (winner as ISearchNetije).tapgyr_breakdown.find(
                              (item) => item.tapgyr === tapgyr
                            )?.tapgyr_total_nobat
                          ? (winner as ISearchNetije).tapgyr_breakdown.find(
                              (item) => item.tapgyr === tapgyr
                            )?.tapgyr_total_nobat
                          : "-"}
                      </span>
                    </div>
                  </td>
                  {/* Total score */}
                  <td className={`${padding}`}>
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%] w-[100%]">
                      <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                        {(winner as Datum).total_score_of_client
                          ? (winner as Datum).total_score_of_client
                          : (winner as ISearchNetije).tapgyr_breakdown.find(
                              (item) => item.tapgyr === tapgyr
                            )?.tapgyr_total_score
                          ? (winner as ISearchNetije).tapgyr_breakdown.find(
                              (item) => item.tapgyr === tapgyr
                            )?.tapgyr_total_score
                          : "-"}
                      </span>
                    </div>
                  </td>
                </tr>
                {/* Mobile jogab berish nobatlary */}
                <tr
                  className={`${
                    id !== data.length - 1 && "border-b border-[#C7C5D0]"
                  } md:hidden`}
                >
                  <th scope="row" colSpan={2}>
                    Jogap beriş nobatlary
                  </th>
                  <td colSpan={2}>
                    <div className="w-full flex gap-[5px] justify-center">
                      {questions.map((question) => {
                        const matchingAnswer =
                          (winner as Datum).answers?.find(
                            (answer) =>
                              answer.question_id === question.id &&
                              answer.score > 0
                          ) ||
                          (winner as Datum).answers?.find(
                            (answer) => answer.question_id === question.id
                          ) ||
                          ((winner as ISearchNetije).tapgyr_breakdown &&
                            (winner as ISearchNetije).tapgyr_breakdown
                              .find((step) => step.tapgyr === tapgyr)
                              ?.answers.find(
                                (answer) =>
                                  answer.question_id === question.id &&
                                  answer.score > 0
                              )) ||
                          ((winner as ISearchNetije).tapgyr_breakdown &&
                            (winner as ISearchNetije).tapgyr_breakdown
                              .find((step) => step.tapgyr === tapgyr)
                              ?.answers.find(
                                (answer) => answer.question_id === question.id
                              ));

                        return (
                          <span
                            key={question.id}
                            className={`text-sm font-semibold leading-[125%] ${
                              matchingAnswer &&
                              matchingAnswer.serial_number_for_correct !== 0
                                ? "text-fillGreen"
                                : matchingAnswer &&
                                  matchingAnswer?.serial_number_for_correct ===
                                    0
                                ? "text-fillRed"
                                : "text-textLight"
                            }`}
                          >
                            {matchingAnswer && matchingAnswer.score !== 0
                              ? matchingAnswer.serial_number_for_correct
                              : matchingAnswer && matchingAnswer?.score === 0
                              ? "X"
                              : "0"}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : !error ? (
        <Loader />
      ) : (
        <div className="w-full text-center">{error}</div>
      )}
      {data.length < total && !error && (
        <button
          onClick={() => getData(true)}
          className="py-[5px] self-center px-[10px] md:w-fit rounded-md bg-blue-500 text-white border border-blue-500 lg:hover:bg-white lg:hover:text-blue-500 transition-all duration-300"
        >
          Dowamy
        </button>
      )}
    </article>
  );
};

export default QuizTapgyrWinners;
