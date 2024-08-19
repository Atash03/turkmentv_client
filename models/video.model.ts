export interface VideoModel {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  desc: string;
  view: number;
  size: number;
  duration: number;
  banner_url: string;
  trailer_url: string;
  content_url: string;
  aydym_com_url: string | null;
  horjun_content_url: string | null;
  belet_url: string | null;
  video_stream_url: string;
  likes: number;
  dislikes: number;
}
