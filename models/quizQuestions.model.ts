export interface IQuizQuestions {
  data: Data;
  message: string;
}

export interface Data {
  id: number;
  title: string;
  date: string;
  banner: string;
  sms_number: string;
  banner_mobile: string;
  description: string;
  rules: Note[];
  notes: Note[];
  questions: Question[];
}

export interface Note {
  title: string;
  content: string;
}

export interface Question {
  id: number;
  question: string;
  status: string;
  score: number;
  starts_at: string;
  ends_at: string;
}
