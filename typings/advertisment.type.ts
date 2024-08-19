import { Dispatch, SetStateAction } from 'react';

export interface IAdvertisment {
  title: string;
  image: string;
  description: string;
}

export interface IAdvertismentContext {
  advertismentData: IAdvertisment | null;
  setAdvertismentData: Dispatch<SetStateAction<IAdvertisment | null>>;
}
