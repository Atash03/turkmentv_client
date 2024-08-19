'use client';

import QuizContext from '@/context/QuizContext';
import VoteContext from '@/context/VoteContext';
import { IVoteDescription } from '@/typings/vote/voteDescription';

import { PropsWithChildren, useMemo, useState } from 'react';

const VoteProvider = ({ children }: PropsWithChildren) => {
  const [voteDescription, setVoteDescription] = useState<string>();
  const voteDescriptionContext = useMemo(
    () => ({ voteDescription, setVoteDescription }),
    [voteDescription, setVoteDescription],
  );

  return <VoteContext.Provider value={{ voteDescriptionContext }}>{children}</VoteContext.Provider>;
};

export default VoteProvider;
