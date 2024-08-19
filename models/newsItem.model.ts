export interface NewsItemModel {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  type: string;
  awtor: string;
  featured_images: FeaturedImage[];
  video: string;
  views: number;
  content_html: string;
  categories: Category[];
  powerseo_title: string;
  powerseo_description: string;
  powerseo_keywords: string;
}

export interface Category {
  id: number;
  name: string;
  powerseo_title: null | string;
  powerseo_description: null | string;
  powerseo_keywords: null | string;
}

export interface FeaturedImage {
  id: number;
  disk_name: string;
  file_name: string;
  path: string;
  extension: string;
}
