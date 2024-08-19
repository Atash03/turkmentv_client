'use client';

import QuizContext from '@/context/QuizContext';
import { IQuizQuestions, Question } from '@/models/quizQuestions.model';
import { IQuizSearchData } from '@/models/quizSearchData.model';

import { IQuizSearch } from '@/typings/quizSearch.type';
import { IQuizSearchActive } from '@/typings/quizSearchActive.type';
import { PropsWithChildren, useMemo, useState } from 'react';

const QuizProvider = ({ children }: PropsWithChildren) => {
  const [quizSearchData, setQuizSearchData] = useState<IQuizSearchData>();
  const quizSearchContext: IQuizSearch = useMemo(
    () => ({ quizSearchData, setQuizSearchData }),
    [quizSearchData, setQuizSearchData],
  );

  const [searchActive, setSearchActive] = useState<boolean>(false);
  const quizSearchActiveContext = useMemo(
    () => ({ searchActive, setSearchActive }),
    [searchActive, setSearchActive],
  );

  const [questionsData, setQuestionsData] = useState<Question[]>();
  const quizQuestionsContext = useMemo(
    () => ({ questionsData, setQuestionsData }),
    [questionsData, setQuestionsData],
  );

  return (
    <QuizContext.Provider
      value={{ quizSearchContext, quizSearchActiveContext, quizQuestionsContext }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizProvider;
