export interface IQuizQuestionsWinners {
  data: Datum[];
}

export interface Datum {
  total_score_of_client: string;
  correct_answers_time: string;
  client_id: number;
  client: Client;
}

export interface Client {
  id: number;
  phone: string;
  answers: Answer[];
}

export interface Answer {
  id: number;
  question_id: number;
  score: number;
  serial_number_for_correct: number;
  client_id: number;
}
