import { Dispatch, SetStateAction } from 'react';

export interface IQuizSearchActive {
  searchActive: boolean;
  setSearchActive: Dispatch<SetStateAction<boolean>>;
}
