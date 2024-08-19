import { ISource } from './source.type';

export interface IVideo {
  id: number;
  video_id?: string;
  views?: number | string | null;
  title: string;
  img: string | null;
  premium?: boolean;
  slides?: boolean;
}
