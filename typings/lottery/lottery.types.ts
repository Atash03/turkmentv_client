export interface LotteryWinnerData {
  no: number;
  client: string;
  dt: string;
  winner_no: number;
  ticket: string;
}

export interface LotteryData {
  id: number;
  title: string;
  description: string;
  image: string;
  start_time: string;
  end_time: string;
  sms_code: string;
  winners: LotteryWinnerData[];
}

export interface LotteryResponse {
  data: LotteryData;
  user_lottery_numbers: string[];
}

export type LotteryStatus = "not-started" | "started" | "ended";
