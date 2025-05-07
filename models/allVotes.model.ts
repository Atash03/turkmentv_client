export interface IAllVotes {
  data: Data;
}

export interface Data {
  id: number;
  title: string;
  starts_at: string;
  ends_at: string;
  sms_number: string;
  status: string;
  description: string;
  banner: string;
  banner_mobile: string;
  voting_items: VotingItem[];
}

export interface VotingItem {
  id: number;
  votes_count: number;
  vote_code: string;
  title: null | string;
  description: null | string;
  photo: null | string;
  votes_percents: number;
  url?: string;
}
