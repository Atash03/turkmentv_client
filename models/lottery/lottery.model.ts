export interface ILotteryWinner {
  no: number;
  client: string;
  dt: string;
  winner_no: number;
  ticket: string;
}
export interface ILotteryRule {
  title: string;
  content: string;
}

export interface ILotteryData {
  id: number;
  title: string;
  description: string;
  image: string;
  start_time: string;
  end_time: string;
  sms_code: string;
  winners: ILotteryWinner[];
  rules: ILotteryRule[] | null;
}

export interface ILotteryResponse {
  data: ILotteryData;
  user_lottery_numbers: string[];
  errorMessage?: string;
}
