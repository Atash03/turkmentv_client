'use client';
import { Queries } from '@/api/queries';

import { v4 } from 'uuid';
import { useState, useEffect, useContext, Dispatch, SetStateAction } from 'react';
import { Answer, IQuizQuestionsWinners } from '@/models/quizQuestionsWinners.model';
import QuizContext from '@/context/QuizContext';
import { IQuizQuestions } from '@/models/quizQuestions.model';

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
  // const [questionsData, setQuestionsData] = useState<IQuizQuestions>();
  const [winnersData, setWinnersData] = useState<IQuizQuestionsWinners>();
  const { questionsData } = useContext(QuizContext).quizQuestionsContext;

  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    Queries.getQuizWinners(quizId).then((res) => {
      setWinnersData(res);
    });
  }, [quizId]);

  // useEffect(() => {
  //   let socket: WebSocket | null = null;
  //   let reconnectTimeout: NodeJS.Timeout | null = null;
  //   let pingInterval: NodeJS.Timeout | null = null;

  //   const connectWebSocket = () => {
  //     try {
  //       socket = new WebSocket(`wss://sms.turkmentv.gov.tm/ws/quiz?dst=${smsNumber}`);
  //       setSocket(socket);

  //       socket.onopen = () => {
  //         console.log('WebSocket is connected');
  //         setIsConnected(true);

  //         pingInterval = setInterval(() => {
  //           if (socket?.readyState === WebSocket.OPEN) {
  //             try {
  //               socket.send(JSON.stringify({ type: 'ping' }));
  //             } catch (error) {
  //               console.error('Error sending ping:', error);
  //             }
  //           }
  //         }, 25000); // Ping every 25 seconds
  //       };

  //       socket.onmessage = (event) => {
  //         try {
  //           console.log('Message received from WebSocket:', event.data);
  //           const message = JSON.parse(event.data);
  //           handleOnMessage(message);
  //         } catch (error) {
  //           console.error('Error processing message:', error);
  //         }
  //       };

  //       socket.onerror = (error) => {
  //         console.error('WebSocket error:', error);
  //       };

  //       socket.onclose = () => {
  //         console.log('WebSocket is closed');
  //         setIsConnected(false);

  //         if (pingInterval) {
  //           clearInterval(pingInterval);
  //         }

  //         if (!reconnectTimeout) {
  //           reconnectTimeout = setTimeout(() => {
  //             console.log('Attempting to reconnect WebSocket...');
  //             connectWebSocket();
  //           }, 5000); // Reconnect after 5 seconds
  //         }
  //       };
  //     } catch (error) {
  //       console.error('WebSocket connection error:', error);
  //     }
  //   };

  //   if (smsNumber && winnersData) {
  //     connectWebSocket();
  //   }

  //   return () => {
  //     if (socket) {
  //       socket.close();
  //     }
  //     if (reconnectTimeout) {
  //       clearTimeout(reconnectTimeout);
  //     }
  //     if (pingInterval) {
  //       clearInterval(pingInterval);
  //     }
  //   };
  // }, [smsNumber]);

  // Function to handle incoming WebSocket message and update winnersData
  const handleOnMessage = (message: Message) => {
    if (!winnersData) {
      console.error('winnersData is undefined');
      return;
    }

    console.log('updating winnersData');

    // Update the winnersData by matching phone with starred_src from the message
    setWinnersData((prevWinnersData) => {
      if (!prevWinnersData) {
        return prevWinnersData;
      }

      return {
        ...prevWinnersData,
        data: prevWinnersData.data.map((winner) => {
          if (winner.client.phone === message.starred_src) {
            const updatedAnswers = [
              ...winner.client.answers,
              {
                id: message.question_id,
                question_id: message.question_id,
                score: message.score,
                serial_number_for_correct: message.serial_number_for_correct,
                client_id: winner.client.id,
              },
            ];

            // Calculate the new correct_answers_time by summing serial_number_for_correct
            const updatedCorrectAnswersTime = updatedAnswers
              .reduce((sum, answer) => sum + answer.serial_number_for_correct, 0)
              .toString();

            return {
              ...winner,
              client: {
                ...winner.client,
                answers: updatedAnswers,
              },
              total_score_of_client: (
                parseInt(winner.total_score_of_client) + message.score
              ).toString(),
              correct_answers_time: updatedCorrectAnswersTime, // Update correct_answers_time
            };
          }
          return winner;
        }),
      };
    });

    console.log('winnersData is updated');
  };

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

            {winnersData?.data[0].client.answers.length !== 0 ? (
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

          {/* Table Body */}
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
                {winnersData.data[0].client.answers.length !== 0 ? (
                  <div className="flex justify-center items-center gap-6 text-base text-textGray leading-[125%] w-[100%] px-3 py-5">
                    {questionsData
                      ? questionsData.map((question) => {
                          // const matchingAnswer = winner.client.answers.find(
                          //   (answer) => answer.question_id === question.id,
                          // );

                          const matchingAnswer =
                            winner.client.answers.find(
                              (answer) => answer.question_id === question.id && answer.score > 0,
                            ) ||
                            winner.client.answers.find(
                              (answer) => answer.question_id === question.id,
                            );

                          // const matchingAnswer = () => {
                          //   const duplicateAnswers: Answer[] = [];

                          //   winner.client.answers.map((answer) =>
                          //     answer.question_id === question.id
                          //       ? duplicateAnswers.push(answer)
                          //       : null,
                          //   );

                          //   console.log(duplicateAnswers);
                          // };

                          return (
                            <span
                              key={v4()}
                              className={`text-sm font-semibold leading-[125%] ${
                                matchingAnswer && matchingAnswer.serial_number_for_correct !== 0
                                  ? 'text-fillGreen'
                                  : matchingAnswer &&
                                    matchingAnswer?.serial_number_for_correct === 0
                                  ? 'text-fillRed'
                                  : 'text-textLight'
                              }`}>
                              {matchingAnswer && matchingAnswer.serial_number_for_correct !== 0
                                ? matchingAnswer.serial_number_for_correct
                                : matchingAnswer && matchingAnswer?.serial_number_for_correct === 0
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

        {/* Mobile table */}
        <div className="sm:hidden flex flex-col bg-fillTableHead rounded-[13px] shadow-quizButton overflow-hidden max-w-[1000px] w-full">
          {/* Table Head */}
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

          {/* Table Body */}
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
                    {winnersData?.data[0].client.answers.length !== 0 ? (
                      <div className="flex justify-center items-center text-xs text-textLight leading-[125%] font-semibold w-fit">
                        <span>Soraglara näçinji jogap berdi :</span>
                      </div>
                    ) : null}
                    {winnersData.data[0].client.answers.length !== 0 ? (
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
                                    matchingAnswer && matchingAnswer.serial_number_for_correct !== 0
                                      ? 'text-fillGreen'
                                      : matchingAnswer &&
                                        matchingAnswer.serial_number_for_correct === 0
                                      ? 'text-fillRed'
                                      : 'text-textLight'
                                  }`}>
                                  {matchingAnswer && matchingAnswer.serial_number_for_correct !== 0
                                    ? matchingAnswer.serial_number_for_correct
                                    : matchingAnswer &&
                                      matchingAnswer.serial_number_for_correct === 0
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
