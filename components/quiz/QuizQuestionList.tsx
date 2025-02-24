'use client';
import QuizQuestion from './QuizQuestion';
import { Queries } from '@/api/queries';
import { v4 } from 'uuid';
import { Dispatch, useContext, useEffect, useState } from 'react';
import { IQuizQuestions, Question } from '@/models/quizQuestions.model';
import QuizContext from '@/context/QuizContext';

interface IProps {
  setQuizFinished: Dispatch<boolean>;
  quizFinished: boolean;
  initialQuestionsData: IQuizQuestions;
  paramsId?: string;
}

const QuizQuestionList = ({
  setQuizFinished,
  quizFinished,
  initialQuestionsData,
  paramsId,
}: IProps) => {
  const [data, setData] = useState<IQuizQuestions>(initialQuestionsData);
  const { quizSearchData } = useContext(QuizContext).quizSearchContext;
  const { setQuestionsData } = useContext(QuizContext).quizQuestionsContext;

  useEffect(() => {
    // Queries.getQuizQuestions().then((res) => setData(res));

    setQuestionsData(initialQuestionsData.data.questions);

    // data?.data.questions.map((question) =>
    //   question.status === 'active' || question.status === 'new'
    //     ? setQuizFinished(false)
    //     : setQuizFinished(true),
    // );

    if (paramsId && !quizFinished) {
      const interval = setInterval(() => {
        Queries.getQuiz(paramsId).then((res) => {
          setData(res);
          setQuestionsData(res.data.questions);

          res.data.questions.map((question) =>
            question.status === 'active' || question.status === 'new'
              ? setQuizFinished(false)
              : setQuizFinished(true),
          );
        });
      }, 60000);
      return () => clearInterval(interval);
    }

    if (!paramsId && !quizFinished) {
      const interval = setInterval(() => {
        Queries.getQuizQuestions().then((res) => {
          setData(res);
          setQuestionsData(res.data.questions);

          res.data.questions.map((question) =>
            question.status === 'active' || question.status === 'new'
              ? setQuizFinished(false)
              : setQuizFinished(true),
          );
        });

      }, 60000);
      return () => clearInterval(interval);
    }
  }, [quizFinished]);

  return (
    <div className="flex flex-col gap-[40px] md:gap-[160px]">
      {data && !quizSearchData ? (
        data.data.questions.map((question, paramsId) =>
          question.status !== 'new' ? (
            <QuizQuestion
              score={question.score}
              questionId={question.id}
              questionNumber={paramsId}
              finished={question.status}
              question={question.question}
              key={v4()}
              startsAt={question.starts_at}
              endsAt={question.ends_at}
            />
          ) : null,
        )
      ) : quizSearchData && Object.values(quizSearchData.data).length === 0 ? (
        <h2 className="text-textDarkt text-center text-[28px] ms:text-[32px] flex items-center justify-center bg-fillBGBlockbg px-[20px] py-[40px] md:px-[40px] md:py-[80px] rounded-[24px]">
          Вы не участвовали ни в одном вопросе
        </h2>
      ) : data ? (
        data.data.questions.map((question, id) =>
          question.status !== 'new' ? (
            <QuizQuestion
              score={question.score}
              questionId={question.id}
              questionNumber={id}
              finished={question.status}
              question={question.question}
              key={v4()}
              startsAt={question.starts_at}
              endsAt={question.ends_at}
            />
          ) : null,
        )
      ) : null}
    </div>
  );
};

export default QuizQuestionList;
