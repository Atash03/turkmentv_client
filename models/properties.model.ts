export interface PropertiesModel {
  data: Datum[];
  success: boolean;
}

export interface Datum {
  id: number;
  title: string;
  description: string;
  filter_value: number;
  color: string;
}
