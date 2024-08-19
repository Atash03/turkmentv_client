import { Dispatch, SetStateAction } from 'react';

export interface IVoteDescription {
  voteDescription: string | undefined;
  setVoteDescription: Dispatch<SetStateAction<string | undefined>>;
}
