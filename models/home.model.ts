export interface HomeModel {
  data: Datum[];
}

export interface Datum {
  id: number;
  title: string;
  url: string;
  image: string;
  type: string;
  status: number;
  description: string;
  created_at: string;
  updated_at: string;
  page_id: null | number;
}
