export interface MarqueeModel {
  data: Datum[];
}

export interface Datum {
  id: number;
  content: string;
  date: string;
  start: string;
  end: string;
  week_day: number;
  channel: string;
  status: number;
  on_marque: number;
  on_channel: number;
}
