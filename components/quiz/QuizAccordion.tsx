'use client';
import { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Queries } from '@/api/queries';
import Loader from '../Loader';
import { IQuizQuestionsHistory } from '@/models/quizQuestionHistory.model';
import { Validator } from '@/utils/validator';
import { v4 } from 'uuid';
import QuizContext from '@/context/QuizContext';

type TProps = {
  finished: string;
  questionId: number;
};

const QuizAccordion = ({ finished, questionId }: TProps) => {
  const [data, setData] = useState<IQuizQuestionsHistory>();
  const [opened, setOpened] = useState<boolean>(finished === 'closed' ? false : true);

  const { quizSearchData } = useContext(QuizContext).quizSearchContext;
  const { searchActive } = useContext(QuizContext).quizSearchActiveContext;

  useEffect(() => {
    if (quizSearchData && Object.values(quizSearchData.data).length != 0 && searchActive) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [quizSearchData]);

  // useEffect(() => {
  //   if (finished === 'closed') {
  //     Queries.getQuizHistory(questionId).then((res) => setData(res));
  //     // console.log('Accordion');
  //     // const interval = setInterval(() => {
  //     //   Queries.getQuizHistory(questionId).then((res) => setData(res));
  //     // }, 60000);
  //     // return () => clearInterval(interval);
  //   }
  // }, [finished]);
  useEffect(() => {
    if (opened && !searchActive) {
      Queries.getQuizHistory(questionId).then((res) => setData(res));
    }
  }, [opened, searchActive]);

  // if (!data) {
  //   return <Loader />;
  // }

  return (
    <div className="flex flex-col shadow-quizButton rounded-[13px] md:rounded-[25px] overflow-hidden">
      {data || quizSearchData ? (
        <AnimatePresence>
          {opened && (
            <>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <div className="flex bg-fillTableHead  md:p-0 gap-3 md:gap-0 border-b border-fillTableStrokeTableHead p-[8px] w-full">
                  <div className="block text-[12px] sm:text-base text-textBlack leading-[125%] font-semibold max-w-[15px] sm:max-w-[100px] w-full sm:px-6 sm:py-5">
                    <span>№</span>
                  </div>
                  <div className="block text-[12px] sm:text-base text-textBlack leading-[125%] font-semibold sm:max-w-[289px] max-w-[107px] w-full sm:px-6  sm:py-5">
                    <span>Telefon belgisi</span>
                  </div>
                  <div className="hidden sm:block text-[12px] sm:text-base text-textBlack leading-[125%] font-semibold max-w-[289px] w-[100%] sm:px-6 sm:py-5">
                    <span>Wagt</span>
                  </div>
                  <div className="block text-[12px] sm:text-base text-textBlack leading-[125%] font-semibold sm:max-w-[289px] max-width-[134px] w-full sm:px-6 sm:py-5">
                    <span>Jogap</span>
                  </div>
                  <div className="block text-[12px] sm:text-base text-textBlack leading-[125%] font-semibold sm:max-w-[289px] w-full max-w-[32px] sm:px-6  sm:py-5">
                    <span>Ballar</span>
                  </div>
                </div>

                {data && data?.data.length != 0 ? (
                  <>
                    <div className="sm:block hidden">
                      {data.data.map((user, id) => (
                        <div
                          className={`flex border-b border-fillTableStrokeTableRow last:border-none ${
                            id % 2 === 0 ? ' bg-fillTableRow' : 'bg-fillTableRow2'
                          }`}
                          key={v4()}>
                          <div className="block text-base text-textBlack leading-[125%] max-w-[100px] w-[100%] px-6 py-5">
                            <span>{id + 1}</span>
                          </div>
                          <div className="block text-base text-textBlack leading-[125%] font-semibold max-w-[289px] w-[100%] px-6 py-5">
                            <span>+{user.client}</span>
                          </div>
                          <div className="block text-base text-textDarkt leading-[125%] max-w-[289px] w-[100%] px-6 py-5">
                            <span>{Validator.parseDate(user.dt)}</span>
                          </div>
                          <div className="block text-base text-textLight leading-[125%] max-w-[289px] w-[100%] px-6 py-5">
                            <span>{user.msg}</span>
                          </div>
                          <div className="block text-base text-textBlack leading-[125%]  max-w-[289px] w-[100%] px-6 py-3">
                            <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                              {user.score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="sm:hidden block">
                      {data.data.map((user, id) => (
                        <div
                          className={`flex items-center justify-center flex-col border-b border-fillTableStrokeTableRow last:border-none p-[8px] gap-1 ${
                            id % 2 === 0 ? ' bg-fillTableRow' : 'bg-fillTableRow2'
                          }`}
                          key={v4()}>
                          <div className="flex gap-[12px] w-full items-center">
                            <div className="block text-[12px] text-textBlack leading-[125%] max-w-[15px] w-full">
                              <span>{id + 1}</span>
                            </div>
                            <div className="block  text-[12px] text-textBlack leading-[125%] font-semibold max-w-[107px] w-full">
                              <span>+{user.client}</span>
                            </div>

                            <div className="block  text-[12px] text-textLight leading-[125%] max-w-[134px] w-full">
                              <span>{user.msg}</span>
                            </div>
                            <div className="block  text-[12px] text-textBlack leading-[125%]  max-w-[32px] w-full">
                              <span className="bg-fillOrange rounded-full w-[24px] h-[24px] flex justify-center items-center text-[12px] leading-[125%] text-white">
                                {user.score}
                              </span>
                            </div>
                          </div>
                          <div className="text-[12px] text-textDarkt leading-[125%] max-w-[289px] w-[100%] text-center">
                            <span>Wagty: {Validator.parseDate(user.dt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}

                {quizSearchData
                  ? Object.values(quizSearchData.data).map((userQuestion, id) =>
                      userQuestion.question_id === questionId
                        ? userQuestion.answers.map((answer, answerId) => (
                            <div key={v4()}>
                              <div
                                className={`sm:flex border-b border-fillTableStrokeTableRow last:border-none hidden ${
                                  answerId % 2 === 0 ? ' bg-fillTableRow' : 'bg-fillTableRow2'
                                }`}
                                key={v4()}>
                                <div className="block text-base  leading-[125%] max-w-[100px] w-[100%] px-6 py-5">
                                  {answer.serial_number_for_correct != null ? (
                                    <span className="text-fillGreen">
                                      {answer.serial_number_for_correct}
                                    </span>
                                  ) : (
                                    <span className="text-fillRed">X</span>
                                  )}
                                </div>
                                <div className="block text-base text-textBlack leading-[125%] font-semibold max-w-[289px] w-[100%] px-6 py-5">
                                  <span>+{answer.client}</span>
                                </div>
                                <div className="hidden md:block text-base text-textDarkt leading-[125%] max-w-[289px] w-[100%] px-6 py-5">
                                  <span>{Validator.parseDate(answer.dt)}</span>
                                </div>
                                <div className="block text-base text-textLight leading-[125%] max-w-[289px] w-[100%] px-6 py-5">
                                  <span>{answer.msg}</span>
                                </div>
                                <div className="block text-base text-textBlack leading-[125%]  max-w-[289px] w-[100%] px-6 py-3">
                                  <span className="bg-fillOrange rounded-full w-[36px] h-[36px] flex justify-center items-center text-base leading-[125%] text-white">
                                    {answer.score}
                                  </span>
                                </div>
                              </div>

                              <div
                                className={`sm:hidden flex items-center justify-center flex-col border-b border-fillTableStrokeTableRow last:border-none p-[8px] gap-1 ${
                                  answerId % 2 === 0 ? ' bg-fillTableRow' : 'bg-fillTableRow2'
                                }`}
                                key={v4()}>
                                <div className="flex gap-[12px] w-full items-center">
                                  <div className="block text-[12px]  leading-[125%] max-w-[15px] w-full">
                                    {answer.serial_number_for_correct != null ? (
                                      <span className="text-fillGreen">
                                        {answer.serial_number_for_correct}
                                      </span>
                                    ) : (
                                      <span className="text-fillRed">X</span>
                                    )}
                                  </div>
                                  <div className="block  text-[12px] text-textBlack leading-[125%] font-semibold max-w-[107px] w-full">
                                    <span>+{answer.client}</span>
                                  </div>

                                  <div className="block  text-[12px] text-textLight leading-[125%] max-w-[134px] w-full">
                                    <span>{answer.msg}</span>
                                  </div>
                                  <div className="block  text-[12px] text-textBlack leading-[125%]  max-w-[32px] w-full">
                                    <span className="bg-fillOrange rounded-full w-[24px] h-[24px] flex justify-center items-center text-[12px] leading-[125%] text-white">
                                      {answer.score}
                                    </span>
                                  </div>
                                </div>
                                <div className="text-[12px] text-textDarkt leading-[125%] max-w-[289px] w-[100%] text-center">
                                  <span>Wagty: {Validator.parseDate(answer.dt)}</span>
                                </div>
                              </div>
                            </div>
                          ))
                        : null,
                    )
                  : null}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      ) : null}
      {finished === 'closed' ? (
        <button
          onClick={() => setOpened(!opened)}
          className={`w-full ${
            opened ? 'bg-fillRed text-white' : 'bg-fillButtonLowContrastDefault text-textDarkt'
          } flex items-center justify-center text-xs md:text-base uppercase leading-[150%] p-[8px] md:py-5 gap-[5px] md:gap-[10px] transition-all delay-[0.2s] font-medium `}>
          Taryhy gör
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="w-[20px] h-[20px] md:w-[24px] md:h-[24px]">
              <path
                d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
                fill={`${opened ? '#fff' : '#636370'}`}
              />
            </svg>
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default QuizAccordion;
