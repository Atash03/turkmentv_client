export interface NewsModel {
  data: Datum[];
  links: Links;
  meta: Meta;
}

export interface Datum {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  type: Type;
  awtor: Awtor;
  featured_images: FeaturedImage[];
  video: string;
  categories: Category[];
}

export enum Awtor {
  Hhm = "HHM",
  Миц = "МИЦ",
  Ннм = "ННМ",
}

export interface Category {
  id: number;
  name: string;
  powerseo_title: Powerseo | null;
  powerseo_description: Powerseo | null;
  powerseo_keywords: Powerseo | null;
}

export enum Powerseo {
  Novosti = "Novosti",
  VTurkmenistane = "V Turkmenistane",
}

export interface FeaturedImage {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: Extension;
}

export enum Extension {
  JPEG = "jpeg",
  Jpg = "jpg",
  PNG = "png",
}

export enum Type {
  Photo = "photo",
  Video = "video",
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
