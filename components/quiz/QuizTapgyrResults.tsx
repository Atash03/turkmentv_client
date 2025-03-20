"use client";
import { getNextQuizNetijeData, getQuizNetijeData } from "@/api/queries";
import { Datum, ISearchNetije } from "@/models/quizQuestionsWinners.model";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { useQuizResults, useResultsLoading } from "@/store/store";

const padding = "py-4";

const QuizTapgyrResults = ({ id, steps }: { id: string; steps: string[] }) => {
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
      const res = await getNextQuizNetijeData(
        id,
        nextPageQueries.limit,
        nextPageQueries.offset
      );
      if (res) {
        setQueries({
          limit: res.per_page,
          offset: nextPageQueries.offset + res.per_page,
        });
        setData([...data, ...res.data]);
      }
    } else {
      setLoading(true);
      const res = await getQuizNetijeData(id);
      if (res) {
        setTotal(res.total);
        setQueries({
          limit: res.per_page,
          offset: res.per_page,
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
        <h1 className="text-[28px] text-[#1B1B21] md:text-[36px] text-center md:text-start">
          Netijeler
        </h1>
      </header>
      {data.length > 0 && !loading && !searchLoading ? (
        <div className="flex flex-col bg-[#F6F2FA] rounded-[12px] overflow-hidden max-w-[700px] self-center w-full">
          {/* Table Head */}
          <div className="flex justify-between bg-[#EAE7EF] p-[20px]">
            {((data[0] as Datum).client?.id ||
              (data[0] as ISearchNetije).place) && (
              <span className={`${padding} max-w-[20px] w-full text-center`}>
                Ýeri
              </span>
            )}
            {((data[0] as Datum)?.client?.phone || data[0].phone) && (
              <span className={`${padding} max-w-[150px] w-full text-center`}>
                Telefon beligisi
              </span>
            )}
            {((data[0] as Datum).correct_answers_time ||
              (data[0] as ISearchNetije).total_nobat) && (
              <span
                className={`${padding} min-w-[50px] text-center md:min-w-[115px] max-w-[150px] w-full flex justify-center`}
              >
                Nobatlaryň jemi
              </span>
            )}
            {((data[0] as Datum).total_score_of_client ||
              (data[0] as ISearchNetije).total_score) && (
              <span
                className={`${padding} min-w-[50px] text-center md:min-w-[115px] max-w-[150px] w-full flex justify-center`}
              >
                Utuklaryň jemi
              </span>
            )}
          </div>
          {/* Table body */}
          <div className="text-[#46464F]">
            {data.map((winner, id) => (
              <React.Fragment key={id}>
                <div
                  key={id}
                  className={`${
                    id !== data.length - 1 && "border-b border-[#C7C5D0]"
                  } flex justify-between items-center px-[20px]`}
                >
                  <span
                    className={`${padding} max-w-[20px] w-full text-center`}
                  >
                    {id > 0 &&
                    (winner as Datum).correct_answers_time ===
                      (data[id - 1] as Datum).correct_answers_time
                      ? id
                      : (winner as ISearchNetije).place
                      ? (winner as ISearchNetije).place
                      : id + 1}
                  </span>
                  <span>
                    +
                    {(winner as Datum).client?.phone
                      ? (winner as Datum).client?.phone
                      : (winner as ISearchNetije).phone
                      ? (winner as ISearchNetije).phone
                      : "-"}
                  </span>
                  <div
                    className={`min-w-[50px] md:min-w-[115px] max-w-[150px] w-full flex flex-col md:flex-row justify-center ${padding}`}
                  >
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                      <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                        {(winner as Datum).correct_answers_time
                          ? (winner as Datum).correct_answers_time
                          : (winner as ISearchNetije).total_nobat
                          ? (winner as ISearchNetije).total_nobat
                          : "-"}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`min-w-[50px] md:min-w-[115px] max-w-[150px] w-full flex flex-col md:flex-row justify-center ${padding}`}
                  >
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%]">
                      <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                        {(winner as Datum).total_score_of_client
                          ? (winner as Datum).total_score_of_client
                          : (winner as ISearchNetije).total_score
                          ? (winner as ISearchNetije).total_score
                          : "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      ) : !error ? (
        <Loader />
      ) : (
        <div className="text-center w-full">{error}</div>
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

export default QuizTapgyrResults;
