export interface ILottery {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  description: string;
  image: string;
  start_time: string;
  end_time: string;
  sms_code: string;
  winners: Winner[];
}

export interface Winner {
  no: number;
  client: string;
  dt: string;
  winner_no: number;
}
