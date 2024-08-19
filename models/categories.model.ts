export interface CategoriesModel {
  data: Datum[];
  links: Links;
  meta: Meta;
}

export interface Datum {
  id: number;
  name: string;
  powerseo_title: null | string;
  powerseo_description: null | string;
  powerseo_keywords: null | string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: string;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
