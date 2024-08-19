export interface PlansModel {
  data: Datum[];
  success: boolean;
}

export interface Datum {
  id: number;
  title: string;
  description: null | string;
  property_id: number;
  folder_table: FolderTable[];
  choice_time: number;
  total_price: null | string;
  created_at: null;
  updated_at: null;
  on_tv: number;
  on_radio: number;
  on_subtitle: number;
  on_web: number;
  on_belet: number;
  usage_name: string;
  beletli: number;
  on_aydym: number;
}

export interface FolderTable {
  time: string;
  set_tv?: string;
  set_aydym?: Set;
  set_belet?: SetBelet;
  set_web?: Set;
  set_sub?: string;
  set_radio?: string;
  price?: string;
}

export type Set = "+" | "";

export type SetBelet = "" | "10000 view";
