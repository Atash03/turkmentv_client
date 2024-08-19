'use client';
import ParticipantsList from '@/components/vote/ParticipantsList';
import VoteProvider from '@/providers/VoteProvider';

interface IParams {
  params: {
    vote_id: string;
  };
}

const page = ({ params }: IParams) => {
  return (
    <main className="pt-[60px] pb-[120px]">
      <div className="container">
        <VoteProvider>
          <div className="flex flex-col items-center w-full">
            <ParticipantsList vote_id={params.vote_id} />
          </div>
        </VoteProvider>
      </div>
    </main>
  );
};

export default page;
