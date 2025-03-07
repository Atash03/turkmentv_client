export interface IQuizQuestionsWinners {
  data: Datum[];
  meta: IMeta;
}

export interface Datum {
  total_score_of_client: string;
  correct_answers_time: string;
  client_id: number;
  phone: string;
  answers: Answer[];
  client?: {
    id: number;
    phone: string;
  };
  tapgyr_breakdown?: {
    tapgyr: number;
    tapgyr_correct_time: number;
    tapgyr_score: number;
  }[];
}
export interface Answer {
  id: number;
  question_id: number;
  score: number;
  serial_number_for_correct: number;
  client_id: number;
}

interface IMeta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
