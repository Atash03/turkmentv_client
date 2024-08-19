export interface IQuizQuestionsHistory {
  data: Datum[];
}

export interface Datum {
  id: number;
  client: string;
  dt: string;
  msg: string;
  score: number;
}
