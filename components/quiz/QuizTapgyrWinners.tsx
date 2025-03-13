"use client";
import { getNextQuizWinnners, getQuizWinnersById } from "@/api/queries";
import { Question } from "@/models/quizQuestions.model";
import {
  Datum,
  IQuizQuestionsWinners,
  ISearchNetije,
} from "@/models/quizQuestionsWinners.model";
import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";

const padding = "py-4";

interface IProps {
  id: string;
  tapgyr: number;
  questions: Question[];
}

const QuizTapgyrWinners = ({ id, tapgyr, questions }: IProps) => {
  const [data, setData] = useState<Datum[] | ISearchNetije[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [phone, setPhone] = useState<string>("");
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string>("");
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

  const handleSearchSubmit = async (event: any) => {
    if (event.key === "Enter" && phone.length === 8) {
      event.preventDefault();
      try {
        setLoading(true);
        const response = await fetch(
          `https://sms.turkmentv.gov.tm/api/quiz/${id}/search_netije`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone }),
          }
        );

        // Handle the response as needed
        const data = await response.json();
        setLoading(false);
        if (!data.error) {
          setData([data.data]);
          setTotal(0);
        } else {
          setData([]);
          setError("Telefon belgisi tapylmady");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <article className="flex flex-col gap-[24px]">
      <header className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-3">
        <h1 className="text-[28px] text-[#1B1B21] md:text-[36px]">
          Tapgyr {tapgyr}
        </h1>
        <div className="flex items-center gap-[14px] lg:col-span-2 relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.93853 0.608964C5.90914 0.206926 6.94943 0 8 0C9.05058 0 10.0909 0.206926 11.0615 0.608964C12.0321 1.011 12.914 1.60028 13.6569 2.34315C14.3997 3.08601 14.989 3.96793 15.391 4.93853C15.7931 5.90914 16 6.94943 16 8C16 9.05057 15.7931 10.0909 15.391 11.0615C15.1172 11.7226 14.7565 12.3425 14.3196 12.9054L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12.9054 14.3196C12.3425 14.7565 11.7226 15.1172 11.0615 15.391C10.0909 15.7931 9.05057 16 8 16C6.94943 16 5.90914 15.7931 4.93853 15.391C3.96793 14.989 3.08601 14.3997 2.34315 13.6569C1.60028 12.914 1.011 12.0321 0.608964 11.0615C0.206926 10.0909 0 9.05058 0 8C0 6.94942 0.206926 5.90914 0.608964 4.93853C1.011 3.96793 1.60028 3.08601 2.34315 2.34315C3.08601 1.60028 3.96793 1.011 4.93853 0.608964ZM8 2C7.21207 2 6.43185 2.15519 5.7039 2.45672C4.97595 2.75825 4.31451 3.20021 3.75736 3.75736C3.20021 4.31451 2.75825 4.97595 2.45672 5.7039C2.15519 6.43185 2 7.21207 2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2Z"
              fill="#46464F"
            />
          </svg>
          <input
            type="tel"
            className="text-[#46464F] focus:outline-[#1B1B21] flex-1 bg-[#E4E1E9] rounded-[12px] py-4 pr-4 pl-12 w-full"
            placeholder="63879809"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyDown={(e) => handleSearchSubmit(e)}
            maxLength={8}
            minLength={8}
          />
        </div>
      </header>
      {data.length > 0 && !loading ? (
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
                      : (winner as ISearchNetije).place
                      ? (winner as ISearchNetije).place
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
                  {/* Answer time */}
                  <td className={`${padding}`}>
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%] w-[100%]">
                      <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                        {(winner as Datum).correct_answers_time
                          ? (winner as Datum).correct_answers_time
                          : (winner as ISearchNetije).tapgyr_breakdown[
                              tapgyr - 1
                            ].tapgyr_total_nobat
                          ? (winner as ISearchNetije).tapgyr_breakdown[
                              tapgyr - 1
                            ].tapgyr_total_nobat
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
                          : (winner as ISearchNetije).tapgyr_breakdown[
                              tapgyr - 1
                            ].tapgyr_total_score
                          ? (winner as ISearchNetije).tapgyr_breakdown[
                              tapgyr - 1
                            ].tapgyr_total_score
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
