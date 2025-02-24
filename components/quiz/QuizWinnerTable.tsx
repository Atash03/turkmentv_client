"use client";
import { Queries } from "@/api/queries";

import { v4 } from "uuid";
import { useState, useEffect, useContext } from "react";
import { IQuizQuestionsWinners } from "@/models/quizQuestionsWinners.model";
import QuizContext from "@/context/QuizContext";
import { useQuizSearchActive } from "@/store/store";

interface Message {
  answer: string;
  score: number;
  date: string;
  serial_number: number;
  serial_number_for_correct: number;
  starred_src: string;
  quiz_id: number;
  question_id: number;
}

interface Winner {
  total_score_of_client: string;
  correct_answers_time: string;
  client_id: number;
  client: {
    id: number;
    phone: string;
    answers: {
      id: number;
      question_id: number;
      score: number;
      serial_number_for_correct: number;
      client_id: number;
    }[];
  };
}

interface IProps {
  quizId: number;
  quizFinished: boolean;
  smsNumber: string;
}

const QuizWinnerTable = ({ quizId, quizFinished, smsNumber }: IProps) => {
  const [winnersData, setWinnersData] = useState<IQuizQuestionsWinners>();
  const { questionsData } = useContext(QuizContext).quizQuestionsContext;

  const { quizSearchData } = useContext(QuizContext).quizSearchContext;
  const { active } = useQuizSearchActive();

  useEffect(() => {
    if (!active) {
      Queries.getQuizWinners(quizId).then((res) => {
        setWinnersData(res);
      });
    } else if (active) {
      setWinnersData(undefined);
    }
  }, [quizId, active]);

  return winnersData?.data.length !== 0 ? (
    <div className="flex flex-col justify-center items-center gap-[60px]">
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        <h2 className="text-textBlack text-[28px] text-center md:text-left md:text-[32px] font-semibold">
          Bäsleşigiň jemi
        </h2>

        {/* Desktop table */}
        <div className="table-desktop hidden sm:flex flex-col bg-fillTableHead rounded-[25px] shadow-quizButton overflow-hidden max-w-[1000px] w-full">
          {/* Table Head */}
          <div className="flex border-b border-fillTableStrokeTableHead">
            {winnersData?.data[0].client_id || quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[54px] w-[100%] pl-6 pr-3 py-5">
                <span>№</span>
              </div>
            ) : null}

            {winnersData?.data[0].client.phone || quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[176px] w-[100%] px-3 py-5">
                <span>Gatnaşyjynyň tel. Beligisi</span>
              </div>
            ) : null}

            {winnersData?.data[0].client.answers.length ||
            quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold w-[100%] px-3 py-5">
                <span>Soraglara jogap berilişiň nobaty</span>
              </div>
            ) : null}

            {winnersData?.data[0].total_score_of_client ||
            quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[180px] w-[100%] px-3 py-5">
                <span>Nobatlaryň jemi</span>
              </div>
            ) : null}
            {winnersData?.data[0].total_score_of_client ||
            quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[180px] w-[100%] px-3 py-5">
                <span>Utuklaryň jemi</span>
              </div>
            ) : null}
          </div>

          {/* Table Body */}
          <div className="">
            {winnersData
              ? winnersData?.data.map((winner, id) => (
                  <div
                    className={`flex border-b border-fillTableStrokeTableRow ${
                      id % 2 === 0 ? "bg-fillTableRow" : "bg-fillTableRow2"
                    }`}
                    key={v4()}
                  >
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%] max-w-[54px] w-[100%] pl-6 pr-3 py-5">
                      <span>
                        {id > 0 &&
                        winner.correct_answers_time ===
                          winnersData.data[id - 1].correct_answers_time
                          ? id
                          : id + 1}
                      </span>
                    </div>
                    {winnersData.data[0].client.phone ? (
                      <div className="flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[176px] w-[100%] px-3 py-5">
                        <span>+{winner.client.phone}</span>
                      </div>
                    ) : null}
                    {winnersData.data[0].client.answers.length !== 0 ? (
                      <div className="flex justify-center items-center gap-6 text-base text-textGray leading-[125%] w-[100%] px-3 py-5">
                        {questionsData
                          ? questionsData.map((question) => {
                              const matchingAnswer =
                                winner.client.answers.find(
                                  (answer) =>
                                    answer.question_id === question.id &&
                                    answer.score > 0
                                ) ||
                                winner.client.answers.find(
                                  (answer) => answer.question_id === question.id
                                );

                              return (
                                <span
                                  key={v4()}
                                  className={`text-sm font-semibold leading-[125%] ${
                                    matchingAnswer &&
                                    matchingAnswer.serial_number_for_correct !==
                                      0
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
                                    : matchingAnswer &&
                                      matchingAnswer?.score === 0
                                    ? "X"
                                    : "0"}
                                </span>
                              );
                            })
                          : null}
                      </div>
                    ) : null}

                    {winnersData.data[0].total_score_of_client ? (
                      <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%] px-3 py-3">
                        <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                          {winner.correct_answers_time}
                        </span>
                      </div>
                    ) : null}
                    {winnersData.data[0].total_score_of_client ? (
                      <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%] px-3 py-3">
                        <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                          {winner.total_score_of_client}
                        </span>
                      </div>
                    ) : null}
                  </div>
                ))
              : quizSearchData && (
                  <div
                    className={`flex border-b border-fillTableStrokeTableRow bg-fillTableRow2`}
                  >
                    {/* Place of the client */}
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%] max-w-[54px] w-[100%] pl-6 pr-3 py-5">
                      <span>{quizSearchData.result.place}</span>
                    </div>
                    {/* Client phone number */}
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[176px] w-[100%] px-3 py-5">
                      <span>
                        +
                        {Object.keys(quizSearchData.data).map(
                          (questionId, i) =>
                            i === 0 &&
                            quizSearchData.data[questionId].answers[0].client
                        )}
                      </span>
                    </div>
                    {/* Serial number answer to questions */}
                    <div className="flex justify-center items-center gap-6 text-base text-textGray leading-[125%] w-[100%] px-3 py-5">
                      {Object.keys(quizSearchData.data)
                        .map((quistionId) => quizSearchData.data[quistionId])
                        .map((question) => {
                          const matchingAnswer = question.answers[0];

                          return (
                            <span
                              key={v4()}
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

                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%] px-3 py-3">
                      <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] ">
                        {quizSearchData.result.total_serial}
                      </span>
                    </div>
                    <div className="flex justify-center items-center text-base text-textBlack leading-[125%]  max-w-[180px] w-[100%] px-3 py-3">
                      <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                        {quizSearchData.result.total_score}
                      </span>
                    </div>
                  </div>
                )}
          </div>
        </div>

        {/* Mobile table */}
        <div className="sm:hidden flex flex-col bg-fillTableHead rounded-[13px] shadow-quizButton overflow-hidden max-w-[1000px] w-full">
          {/* Table Head */}
          <div className="flex border-b border-fillTableStrokeTableHead p-2 gap-[8px]">
            {winnersData?.data[0].client_id || quizSearchData?.data ? (
              <div className="text-center flex items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[14px] w-[100%]">
                <span>№</span>
              </div>
            ) : null}

            {winnersData?.data[0].client.phone || quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[107px] w-[100%]">
                <span>Gatnaşyjynyň tel. Beligisi</span>
              </div>
            ) : null}

            {winnersData?.data[0].total_score_of_client ||
            quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[75px] w-[100%]">
                <span>Soraglara jogap berilişiň nobaty </span>
              </div>
            ) : null}
            {winnersData?.data[0].total_score_of_client ||
            quizSearchData?.data ? (
              <div className="text-center flex justify-center items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[99px] w-[100%]">
                <span>Nobatlaryň jemi</span>
              </div>
            ) : null}
          </div>

          {/* Table Body */}
          <div className="">
            {winnersData
              ? winnersData?.data.map((winner, id) => (
                  <div
                    className={`flex border-b border-fillTableStrokeTableRow  items-center p-[8px] gap-[8px] ${
                      id % 2 === 0 ? "bg-fillTableRow" : "bg-fillTableRow2"
                    }`}
                    key={v4()}
                  >
                    <div className="flex  items-center text-base text-textBlack leading-[125%] max-w-[14px] w-[100%] ">
                      <span>{id + 1}</span>
                    </div>

                    <div className="flex flex-col gap-[8px] w-full">
                      <div className="flex gap-[8px] items-center">
                        {winnersData.data[0].client.phone ? (
                          <div className="flex items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[107px] w-full">
                            <span>+{winner.client.phone}</span>
                          </div>
                        ) : null}

                        {winnersData.data[0].total_score_of_client ? (
                          <div className="flex justify-center items-center text-xs text-textBlack leading-[125%] max-w-[75px] w-full">
                            <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[24px] h-[24px] flex justify-center items-center text-xs leading-[125%] ">
                              {winner.correct_answers_time}
                            </span>
                          </div>
                        ) : null}
                        {winnersData.data[0].total_score_of_client ? (
                          <div className="flex justify-center items-center text-xs text-textBlack leading-[125%] max-w-[99px] w-full">
                            <span className="bg-fillOrange rounded-full w-[24px] h-[24px] flex justify-center items-center text-xs leading-[125%] text-white">
                              {winner.total_score_of_client}
                            </span>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex gap-[8px] items-center">
                        {winnersData?.data[0].client.answers.length !== 0 ? (
                          <div className="flex justify-center items-center text-xs text-textLight leading-[125%] font-semibold w-fit">
                            <span>Soraglara näçinji jogap berdi :</span>
                          </div>
                        ) : null}
                        {winnersData.data[0].client.answers.length !== 0 ? (
                          <div className="flex justify-center items-center gap-[4px] text-xs text-textGray leading-[125%] w-fit">
                            {questionsData
                              ? questionsData.map((question) => {
                                  const matchingAnswer =
                                    winner.client.answers.find(
                                      (answer) =>
                                        answer.question_id === question.id &&
                                        answer.score > 0
                                    ) ||
                                    winner.client.answers.find(
                                      (answer) =>
                                        answer.question_id === question.id
                                    );
                                  return (
                                    <span
                                      key={v4()}
                                      className={`text-sm font-semibold leading-[125%] ${
                                        matchingAnswer &&
                                        matchingAnswer.serial_number_for_correct !==
                                          0
                                          ? "text-fillGreen"
                                          : matchingAnswer &&
                                            matchingAnswer.serial_number_for_correct ===
                                              0
                                          ? "text-fillRed"
                                          : "text-textLight"
                                      }`}
                                    >
                                      {matchingAnswer &&
                                      matchingAnswer.score !== 0
                                        ? matchingAnswer.serial_number_for_correct
                                        : matchingAnswer &&
                                          matchingAnswer?.score === 0
                                        ? "X"
                                        : "0"}
                                    </span>
                                  );
                                })
                              : null}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))
              : quizSearchData && (
                  <div
                    className={`flex border-b border-fillTableStrokeTableRow  items-center p-[8px] gap-[8px] bg-fillTableRow2`}
                  >
                    <div className="flex  items-center text-base text-textBlack leading-[125%] max-w-[14px] w-[100%] ">
                      <span>{quizSearchData.result.place}</span>
                    </div>

                    <div className="flex flex-col gap-[8px] w-full">
                      <div className="flex gap-[8px] items-center">
                        <div className="flex items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[107px] w-full">
                          <span>
                            +
                            {Object.keys(quizSearchData.data).map(
                              (questionId, i) =>
                                i === 0 &&
                                quizSearchData.data[questionId].answers[0]
                                  .client
                            )}
                          </span>
                        </div>

                        <div className="flex justify-center items-center text-xs text-textBlack leading-[125%] max-w-[75px] w-full">
                          <span className="border border-[#2C7CDA] text-[#2C7CDA] rounded-full w-[24px] h-[24px] flex justify-center items-center text-xs leading-[125%] ">
                            {quizSearchData.result.total_serial}
                          </span>
                        </div>
                        <div className="flex justify-center items-center text-xs text-textBlack leading-[125%] max-w-[99px] w-full">
                          <span className="bg-fillOrange rounded-full w-[24px] h-[24px] flex justify-center items-center text-xs leading-[125%] text-white">
                            {quizSearchData.result.total_score}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-[8px] items-center">
                        <div className="flex justify-center items-center text-xs text-textLight leading-[125%] font-semibold w-fit">
                          <span>Soraglara näçinji jogap berdi :</span>
                        </div>
                        <div className="flex justify-center items-center gap-[4px] text-xs text-textGray leading-[125%] w-fit">
                          {Object.keys(quizSearchData.data)
                            .map(
                              (quistionId) => quizSearchData.data[quistionId]
                            )
                            .map((question) => {
                              const matchingAnswer = question.answers[0];

                              return (
                                <span
                                  key={v4()}
                                  className={`text-sm font-semibold leading-[125%] ${
                                    matchingAnswer &&
                                    matchingAnswer.serial_number_for_correct !==
                                      0
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
                                    : matchingAnswer &&
                                      matchingAnswer?.score === 0
                                    ? "X"
                                    : "0"}
                                </span>
                              );
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>

      {/* Rules block */}
      <div className="flex flex-col gap-[20px] p-5 border border-strokeLightGray1 rounded-[25px] max-w-[1000px] w-full items-center justify-center">
        <h3 className="text-[26px] text-textBlack font-semibold leading-[124%]">
          Belgileriň düşündirilişi
        </h3>
        <div className="flex flex-col gap-[10px] justify-center md:items-center">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-y-[10px] gap-x-[26px]">
            <div className="flex gap-[10px] items-center ">
              <div className="bg-fillOrange rounded-full min-w-[32px] h-[32px] flex justify-center items-center">
                <span className=" text-sm leading-[125%] text-white">100</span>
              </div>
              <span className="text-base leading-[120%] text-textLight w-full">
                Bäsleşikde gazanylan utuklaryň jemi
              </span>
            </div>
            <div className="flex gap-[10px] items-center ">
              <div className="border border-fillBlue rounded-full min-w-[32px] h-[32px] flex justify-center items-center">
                <span className="text-fillBlue text-sm leading-[125%] ">
                  100
                </span>
              </div>

              <span className="text-base leading-[120%] text-textLight w-full">
                Soraga jogaplaryň tertip belgisiniň jemi
              </span>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="flex justify-center items-center min-w-[32px]">
                <span className="text-xl font-semibold leading-[120%] text-fillGreen ">
                  1
                </span>
              </div>
              <span className="text-base leading-[120%] text-textLight">
                Dogry jogaplara näçinji bolup jogap berdi
              </span>
            </div>
            <div className="flex gap-[10px] items-center ">
              <div className="flex justify-center items-center min-w-[32px]">
                <span className="text-xl font-semibold leading-[120%] text-fillRed">
                  X
                </span>
              </div>
              <span className="text-base leading-[120%] text-textLight">
                Soraga nädogry jogap berdi
              </span>
            </div>
          </div>
          <div className="flex gap-[10px] items-center ">
            <div className="flex justify-center items-center min-w-[32px]">
              <span className="text-xl font-semibold leading-[120%] text-textLight">
                0
              </span>
            </div>
            <span className="text-base leading-[120%] text-textLight">
              Soraga jogap ugratmady
            </span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default QuizWinnerTable;
