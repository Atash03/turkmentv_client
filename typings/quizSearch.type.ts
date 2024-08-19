import { IQuizSearchData } from '@/models/quizSearchData.model';
import { Dispatch, SetStateAction } from 'react';

export interface IQuizSearch {
  quizSearchData: IQuizSearchData | undefined;
  setQuizSearchData: Dispatch<SetStateAction<IQuizSearchData | undefined>>;
}
