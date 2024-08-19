'use client';
import { Queries } from '@/api/queries';

import { v4 } from 'uuid';
import { useState, useEffect, useContext } from 'react';
import { IQuizQuestionsWinners } from '@/models/quizQuestionsWinners.model';
import QuizContext from '@/context/QuizContext';

interface IProps {
  quizId: number;
  quizFinished: boolean;
}

const QuizWinnerTable = ({ quizId, quizFinished }: IProps) => {
  // const [questionsData, setQuestionsData] = useState<IQuizQuestions>();
  const [winnersData, setWinnersData] = useState<IQuizQuestionsWinners>();
  const { questionsData } = useContext(QuizContext).quizQuestionsContext;

  useEffect(() => {
    if (quizFinished) {
      // Queries.getQuizQuestions().then((res) => {
      //   setQuestionsData(res);
      // });
      Queries.getQuizWinners(quizId).then((res) => {
        setWinnersData(res);
      });
    }
  }, []);
  // const { data, error, isFetching } = useQuery({
  //   queryKey: ['quiz_questions_winners'],
  //   queryFn: () => Queries.getQuizWinners(quizId),
  //   keepPreviousData: true,
  // });

  // if (isFetching) return <Loader />;
  // if (error) return <h1>{JSON.stringify(error)}</h1>;

  return winnersData?.data.length != 0 ? (
    <div className="flex flex-col justify-center items-center gap-[60px]">
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        <h2 className="text-textBlack text-[28px] text-center md:text-left md:text-[32px] font-semibold">
          Bäsleşigiň jemi
        </h2>
        <div className="table-desktop hidden sm:flex flex-col bg-fillTableHead rounded-[25px] shadow-quizButton overflow-hidden max-w-[1000px] w-full">
          <div className="flex border-b border-fillTableStrokeTableHead">
            {winnersData?.data[0].client_id ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[54px] w-[100%] pl-6 pr-3 py-5">
                <span>№</span>
              </div>
            ) : null}

            {winnersData?.data[0].client.phone ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[176px] w-[100%] px-3 py-5">
                <span>Gatnaşyjynyň tel. Beligisi</span>
              </div>
            ) : null}

            {winnersData?.data[0].client.answers.length != 0 ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold w-[100%] px-3 py-5">
                <span>Soraglara näçinji jogap berdi</span>
              </div>
            ) : null}

            {winnersData?.data[0].total_score_of_client ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[180px] w-[100%] px-3 py-5">
                <span>Jogaplaryň jemi</span>
              </div>
            ) : null}
            {winnersData?.data[0].total_score_of_client ? (
              <div className="text-center flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[180px] w-[100%] px-3 py-5">
                <span>Utuklaryň jemi</span>
              </div>
            ) : null}
          </div>

          <div className="">
            {winnersData?.data.map((winner, id) => (
              <div
                className={`flex border-b border-fillTableStrokeTableRow ${
                  id % 2 === 0 ? 'bg-fillTableRow' : 'bg-fillTableRow2'
                }`}
                key={v4()}>
                <div className="flex justify-center items-center text-base text-textBlack leading-[125%] max-w-[54px] w-[100%] pl-6 pr-3 py-5">
                  <span>{id + 1}</span>
                </div>
                {winnersData.data[0].client.phone ? (
                  <div className="flex justify-center items-center text-base text-textBlack leading-[125%] font-semibold max-w-[176px] w-[100%] px-3 py-5">
                    <span>+{winner.client.phone}</span>
                  </div>
                ) : null}
                {winnersData.data[0].client.answers.length != 0 ? (
                  <div className="flex justify-center items-center gap-6 text-base text-textGray leading-[125%] w-[100%] px-3 py-5">
                    {questionsData
                      ? questionsData.map((question) => {
                          const matchingAnswer = winner.client.answers.find(
                            (answer) => answer.question_id === question.id,
                          );
                          return (
                            <span
                              key={v4()}
                              className={`text-sm font-semibold leading-[125%] ${
                                matchingAnswer && matchingAnswer.serial_number_for_correct != null
                                  ? 'text-fillGreen'
                                  : matchingAnswer &&
                                    matchingAnswer.serial_number_for_correct === null
                                  ? 'text-fillRed'
                                  : 'text-textLight'
                              }`}>
                              {matchingAnswer && matchingAnswer.serial_number_for_correct != null
                                ? matchingAnswer.serial_number_for_correct
                                : matchingAnswer &&
                                  matchingAnswer.serial_number_for_correct === null
                                ? 'X'
                                : '0'}
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
            ))}
          </div>
        </div>

        <div className="sm:hidden flex flex-col bg-fillTableHead rounded-[13px] shadow-quizButton overflow-hidden max-w-[1000px] w-full">
          <div className="flex border-b border-fillTableStrokeTableHead p-2 gap-[8px]">
            {winnersData?.data[0].client_id ? (
              <div className="text-center flex items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[14px] w-[100%]">
                <span>№</span>
              </div>
            ) : null}

            {winnersData?.data[0].client.phone ? (
              <div className="text-center flex justify-center items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[107px] w-[100%]">
                <span>Gatnaşyjynyň tel. Beligisi</span>
              </div>
            ) : null}

            {winnersData?.data[0].total_score_of_client ? (
              <div className="text-center flex justify-center items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[75px] w-[100%]">
                <span>Балы за быстроту</span>
              </div>
            ) : null}
            {winnersData?.data[0].total_score_of_client ? (
              <div className="text-center flex justify-center items-center text-xs text-textBlack leading-[125%] font-semibold max-w-[99px] w-[100%]">
                <span>Utuklaryň jemi</span>
              </div>
            ) : null}
          </div>

          <div className="">
            {winnersData?.data.map((winner, id) => (
              <div
                className={`flex border-b border-fillTableStrokeTableRow  items-center p-[8px] gap-[8px] ${
                  id % 2 === 0 ? 'bg-fillTableRow' : 'bg-fillTableRow2'
                }`}
                key={v4()}>
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
                    {winnersData?.data[0].client.answers.length != 0 ? (
                      <div className="flex justify-center items-center text-xs text-textLight leading-[125%] font-semibold w-fit">
                        <span>Soraglara näçinji jogap berdi :</span>
                      </div>
                    ) : null}
                    {winnersData.data[0].client.answers.length != 0 ? (
                      <div className="flex justify-center items-center gap-[4px] text-xs text-textGray leading-[125%] w-fit">
                        {questionsData
                          ? questionsData.map((question) => {
                              const matchingAnswer = winner.client.answers.find(
                                (answer) => answer.question_id === question.id,
                              );
                              return (
                                <span
                                  key={v4()}
                                  className={`text-sm font-semibold leading-[125%] ${
                                    matchingAnswer &&
                                    matchingAnswer.serial_number_for_correct != null
                                      ? 'text-fillGreen'
                                      : matchingAnswer &&
                                        matchingAnswer.serial_number_for_correct === null
                                      ? 'text-fillRed'
                                      : 'text-textLight'
                                  }`}>
                                  {matchingAnswer &&
                                  matchingAnswer.serial_number_for_correct != null
                                    ? matchingAnswer.serial_number_for_correct
                                    : matchingAnswer &&
                                      matchingAnswer.serial_number_for_correct === null
                                    ? 'X'
                                    : '0'}
                                </span>
                              );
                            })
                          : null}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
                Bäsşeikde gazanylan utuklaryň jemi
              </span>
            </div>
            <div className="flex gap-[10px] items-center ">
              <div className="border border-fillBlue rounded-full min-w-[32px] h-[32px] flex justify-center items-center">
                <span className="text-fillBlue text-sm leading-[125%] ">100</span>
              </div>

              <span className="text-base leading-[120%] text-textLight w-full">
                Soraga jogaplaryň tertip belgisiniň jemi
              </span>
            </div>
            <div className="flex gap-[10px] items-center">
              <div className="flex justify-center items-center min-w-[32px]">
                <span className="text-xl font-semibold leading-[120%] text-fillGreen ">1</span>
              </div>
              <span className="text-base leading-[120%] text-textLight">
                Dogry jogaplara näçinji bolup jogap berdi
              </span>
            </div>
            <div className="flex gap-[10px] items-center ">
              <div className="flex justify-center items-center min-w-[32px]">
                <span className="text-xl font-semibold leading-[120%] text-fillRed">X</span>
              </div>
              <span className="text-base leading-[120%] text-textLight">
                Soraga nädogry jogap berdi
              </span>
            </div>
          </div>
          <div className="flex gap-[10px] items-center ">
            <div className="flex justify-center items-center min-w-[32px]">
              <span className="text-xl font-semibold leading-[120%] text-textLight">0</span>
            </div>
            <span className="text-base leading-[120%] text-textLight">Soraga jogap ugratmady</span>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default QuizWinnerTable;
