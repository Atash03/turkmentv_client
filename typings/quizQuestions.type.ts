import { Question } from '@/models/quizQuestions.model';
import { Dispatch, SetStateAction } from 'react';

export interface IQuizQuestions {
  questionsData: Question[] | undefined;
  setQuestionsData: Dispatch<SetStateAction<Question[] | undefined>>;
}
