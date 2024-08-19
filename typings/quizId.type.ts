import { Dispatch, SetStateAction } from 'react';

export interface IQuizId {
  quizId: number;
  setQuizId: Dispatch<SetStateAction<number>>;
}
