export interface BannerModel {
  data: Datum[];
}

export interface Datum {
  id: number;
  img_url: string;
  alt: string;
  url: string;
  content: string | null;
  page_id: number | null;
}
