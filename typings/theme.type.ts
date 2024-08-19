import { Dispatch, SetStateAction } from 'react';

export interface ITheme {
  theme: 'dark' | 'light';
  setTheme: Dispatch<SetStateAction<'dark' | 'light'>>;
}
