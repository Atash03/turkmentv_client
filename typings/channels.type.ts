import { ISource } from './source.type';

export interface IChannels extends ISource {
  // active: boolean;
  source: string;
  id: number;
  img: string;
  channel: number;
  name: string;
  // source: ISource;
}
