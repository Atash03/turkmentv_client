import { Dispatch, SetStateAction } from 'react';

export interface IBurger {
  burgerOpen: boolean;
  setBurgerOpen: Dispatch<SetStateAction<boolean>>;
}
