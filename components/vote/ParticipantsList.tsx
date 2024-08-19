'use client';
import React, { useContext, useEffect, useState } from 'react';
import GradientTitle from './GradientTitle';
import ParticipantCard from './ParticipantCard';
import { v4 } from 'uuid';
import { IAllVotes, VotingItem } from '@/models/allVotes.model';
import { Queries } from '@/api/queries';
import Loader from '../Loader';
import VoteContext from '@/context/VoteContext';
import PageBage from './PageBage';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import Countdown from './Countdown';

interface IParams {
  vote_id?: string;
}

const ParticipantsList = ({ vote_id }: IParams) => {
  const [data, setData] = useState<IAllVotes>();
  const [participantsData, setParticipantsData] = useState<VotingItem[]>();
  const [voteStatus, setVoteStatus] = useState<string>();
  const [winnersCount, setWinnersCount] = useState<number>(0);
  const mobile = useMediaQuery('(max-width: 768px)');

  const { setVoteDescription } = useContext(VoteContext).voteDescriptionContext;

  useEffect(() => {
    if (!vote_id) {
      Queries.getAllVotes().then((res) => {
        setData(res);
        setParticipantsData(res.data.voting_items);
        setVoteDescription(res.data.description);
        setVoteStatus(res.data.status);
      });
    } else {
      Queries.getVote(vote_id).then((res) => {
        setData(res);
        setParticipantsData(res.data.voting_items);
        setVoteDescription(res.data.description);
        setVoteStatus(res.data.status);
      });
    }

    if (voteStatus !== 'closed') {
      const interval = setInterval(() => {
        if (!vote_id) {
          Queries.getAllVotes().then((res) => {
            setParticipantsData(res.data.voting_items);
            setVoteStatus(res.data.status);
          });
        } else {
          Queries.getVote(vote_id).then((res) => {
            setParticipantsData(res.data.voting_items);
            setVoteStatus(res.data.status);
          });
        }
      }, 10000);
      return () => clearInterval(interval);
    }

    // if (voteStatus !== 'closed' && vote_id) {
    //   const interval = setInterval(() => {
    //     Queries.getVote(vote_id).then((res) => {
    //       setParticipantsData(res.data.voting_items);
    //       setVoteStatus(res.data.status);
    //     });
    //   }, 10000);
    //   return () => clearInterval(interval);
    // }

    if (participantsData) {
      winnersCountHandle(participantsData);
    }
  }, [voteStatus]);

  const winnersCountHandle = (winners: VotingItem[]) => {
    let count = 0;
    winners.map((winner) => {
      if (winner.votes_percents === 100 && winner.votes_count === winners[0].votes_count) {
        count++;
        setWinnersCount(count);
      }
    });
    return count;
  };

  if (data) {
    if (!data?.data) {
      return (
        <div className="py-12">
          <GradientTitle title={'No voting to show on the site'} size="big" />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-[20px] sm:gap-[40px] w-full items-center">
        {data.data.description ? <PageBage title={data.data.description} /> : null}

        {data.data.banner ? (
          <div className="relative w-full md:min-h-[150px] md:h-auto h-[100px] ">
            {mobile ? (
              <Image
                fill
                src={data.data.banner_mobile !== null ? data.data.banner_mobile : data.data.banner}
                alt={data.data.title}
                unselectable="off"
                unoptimized
                className="rounded-[40px]"
              />
            ) : (
              <Image
                fill
                src={data.data.banner}
                alt={data.data.title}
                unselectable="off"
                unoptimized
                className="rounded-[40px]"
              />
            )}
          </div>
        ) : null}

        <div className="flex flex-col gap-[10px] sm:gap-[20px] w-full items-center">
          {/* {data.data.title ? <GradientTitle title={data.data.title} size="big" /> : null} */}

          {data.data.ends_at && data.data.starts_at ? (
            <Countdown endsAt={data.data.ends_at} startsAt={data.data.starts_at} />
          ) : null}

          <div className="flex w-full flex-col items-center gap-[10px] sm:gap-[20px]">
            {winnersCount > 1 ? <GradientTitle title="победители" size="small" /> : null}

            {participantsData &&
            participantsData[0].votes_count > 0 &&
            participantsData[0].votes_percents === 100 ? (
              <div className="flex flex-col items-center overflow-hidden bg-fillNavyBlue rounded-[10px] sm:rounded-[30px] max-w-[940px] w-full px-[5px] py-[20px] sm:p-[20px] sm:gap-[20px] gap-[10px]">
                {participantsData.map((participant, id) =>
                  participant.votes_percents === 100 &&
                  participant.votes_count === participantsData[0].votes_count &&
                  voteStatus ? (
                    <ParticipantCard
                      key={v4()}
                      voteStatus={voteStatus}
                      isFirst={id === 0 ? true : false}
                      name={participant.title}
                      progress={participant.votes_percents}
                      votes={participant.votes_count}
                      voteCode={participant.vote_code}
                      number={id + 1}
                      photo={participant.photo}
                      smsNumber={data.data.sms_number}
                      winner={true}
                    />
                  ) : null,
                )}
              </div>
            ) : null}

            {winnersCount > 1 ? <div className="w-full h-[1px] bg-[#3636A3]"></div> : null}
          </div>
          {participantsData
            ? participantsData.map((participant, id) =>
                participant.votes_percents !== 100 && voteStatus ? (
                  <ParticipantCard
                    key={v4()}
                    voteStatus={voteStatus}
                    isFirst={id === 0 ? true : false}
                    name={participant.title}
                    progress={participant.votes_percents}
                    votes={participant.votes_count}
                    voteCode={participant.vote_code}
                    number={id + 1}
                    photo={participant.photo}
                    smsNumber={data.data.sms_number}
                    winner={false}
                  />
                ) : null,
              )
            : null}
        </div>
      </div>
    );
  } else {
    return (
      <main className="h-full py-[100px]">
        <div className="container">
          <Loader />
        </div>
      </main>
    );
  }
};

export default ParticipantsList;
