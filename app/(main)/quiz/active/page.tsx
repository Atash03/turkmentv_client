'use client';
import { Queries } from '@/api/queries';
import QuizQuestionList from '@/components/quiz/QuizQuestionList';
import QuizSearch from '@/components/quiz/QuizSearch';
import QuizTable from '@/components/quiz/QuizTable';
import QuizWinnerTable from '@/components/quiz/QuizWinnerTable';
import { IQuizQuestions, Question } from '@/models/quizQuestions.model';
import QuizProvider from '@/providers/QuizProvider';
import { Validator } from '@/utils/validator';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const page = () => {
  const [quizFinished, setQuizFinished] = useState<boolean>(false);
  const [data, setData] = useState<IQuizQuestions>();

  useEffect(() => {
    Queries.getQuizQuestions().then((res) => {
      setData(res);
      res
        ? res.data.questions[res.data.questions.length - 1]?.status === 'closed'
          ? setQuizFinished(true)
          : setQuizFinished(false)
        : null;
    });
  }, []);

  const mobile = useMediaQuery('(max-width: 768px)');

  return (
    <main className="pt-[60px] pb-[200px]">
      {typeof data !== 'string' ? (
        <div className="container flex flex-col md:gap-[200px] gap-[80px]">
          <QuizProvider>
            <div className="flex flex-col gap-[100px]">
              <div className="flex flex-col gap-[45px]">
                <div className="flex flex-col gap-[10px] md:gap-[5px]">
                  <h3 className="text-base md:text-[14px] text-textLight font-semibold md:font-normal">
                    {data ? Validator.reveseDate(data?.data.date) : null}
                  </h3>
                  <h1 className="text-textBlack text-[32px] md:text-[60px] leading-[100%] font-semibold">
                    {data?.data.title}
                  </h1>
                  <h3 className="text-base font-medium leading-[125%] md:text-[14px] text-textDarkt mt-[5px] max-w-[600px]">
                    {data?.data.description}
                  </h3>
                </div>
                {data?.data.banner ? (
                  <div className="relative w-full md:min-h-[150px] md:h-auto h-[100px]">
                    {mobile ? (
                      <Image
                        src={
                          data.data.banner_mobile !== null
                            ? data.data.banner_mobile
                            : data.data.banner
                        }
                        alt={'banner'}
                        unoptimized
                        unselectable="off"
                        fill
                        className="rounded-[8px]"
                      />
                    ) : (
                      <Image
                        src={data?.data.banner}
                        alt={'banner'}
                        unoptimized
                        unselectable="off"
                        fill
                        className="rounded-[8px]"
                      />
                    )}
                  </div>
                ) : null}
              </div>

              {data?.data.rules && data.data.notes ? (
                <QuizTable rules={data?.data.rules} notes={data?.data.notes} />
              ) : null}
            </div>

            {data?.data.id && quizFinished ? <QuizSearch quizId={data?.data.id} /> : null}

            <div className="flex flex-col md:gap-[160px] gap-[80px]">
              {data?.data ? (
                <QuizQuestionList
                  initialQuestionsData={data}
                  setQuizFinished={setQuizFinished}
                  quizFinished={quizFinished}
                />
              ) : null}

              {/* {data?.data.id && quizFinished ? (
                <QuizWinnerTable quizId={data?.data.id} quizFinished={quizFinished} />
              ) : null} */}
              {data?.data.id && (
                <QuizWinnerTable
                  smsNumber={data.data.sms_number}
                  quizId={data?.data.id}
                  quizFinished={quizFinished}
                />
              )}
            </div>
          </QuizProvider>
        </div>
      ) : (
        <div className="container text-[40px] flex items-center justify-center font-bold text-textLight min-h-[30vh]">
          Непредвиденная ошибка. Нет активной викторины.
        </div>
      )}
    </main>
  );
};

export default page;
