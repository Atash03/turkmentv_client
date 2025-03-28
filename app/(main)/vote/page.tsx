import ParticipantsList from "@/components/vote/ParticipantsList";
import VoteProvider from "@/providers/VoteProvider";

const page = () => {
  return (
    <main className="pt-[60px] pb-[120px]">
      <div className="container">
        <VoteProvider>
          <div className="flex flex-col items-center w-full">
            <ParticipantsList />
          </div>
        </VoteProvider>
      </div>
    </main>
  );
};

export default page;