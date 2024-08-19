'use client';
import { IQuizContext } from '@/typings/context.type';
import { createContext } from 'react';

const QuizContext = createContext<IQuizContext>({} as IQuizContext);

export default QuizContext;
