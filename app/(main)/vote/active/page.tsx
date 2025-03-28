import ParticipantsList from "@/components/vote/ParticipantsList";
import VoteProvider from "@/providers/VoteProvider";
import { Suspense } from "react";

const page = () => {
  return (
    <main className="pt-[60px] pb-[120px]">
      <div className="container">
        <VoteProvider>
          <div className="flex flex-col items-center w-full">
            <Suspense>
              <ParticipantsList all />
            </Suspense>
          </div>
        </VoteProvider>
      </div>
    </main>
  );
};

export default page;
