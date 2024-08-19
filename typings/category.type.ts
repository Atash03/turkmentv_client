import { Dispatch, SetStateAction } from "react";

export interface ICategory {
  id: number;
  name: string;
}

export interface ICategoryContext {
  category: ICategory | null;
  setCategory: Dispatch<SetStateAction<ICategory | null>>;
}
