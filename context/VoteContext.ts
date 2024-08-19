'use client';
import { IVoteContext } from '@/typings/context.type';
import { createContext } from 'react';

const VoteContext = createContext<IVoteContext>({} as IVoteContext);

export default VoteContext;
