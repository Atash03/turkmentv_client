export interface VideosModel {
  data: Datum[];
  links: Links;
  meta: Meta;
}

export interface Datum {
  id: number;
  title: string;
  desc: null | string;
  view: number | null;
  size: number | null;
  duration: number | null;
  banner_url: null | string;
  trailer_url: null | string;
  content_url: null | string;
  horjun_trailer_url: null | string;
  horjun_content_url: null | string;
}

export interface Links {
  first: string;
  last: string;
  prev: null;
  next: null;
}

export interface Meta {
  current_page: number;
  from: number;
  last_page: number;
  links: Link[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}
