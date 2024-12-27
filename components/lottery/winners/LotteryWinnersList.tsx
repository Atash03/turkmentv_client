import { LotteryWinnerData, LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';
import LotteryWinner from './LotteryWinner';

const LotteryWinnersList = ({ winners }: { winners: LotteryWinnerDataSimplified[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1028px]">
      <div className="flex flex-col gap-2 w-full md:pb-4 pb-3  border-b border-[#CECCFF]">
        <h4 className="font-heading-3-regular">Results</h4>
        <p className="font-base-medium">The results after each stage will be shown here.</p>
      </div>
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 w-full">
        {winners.map((item, index) => (
          <LotteryWinner key={item.ticket} phone={item.client} ticket={item.ticket} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LotteryWinnersList;
