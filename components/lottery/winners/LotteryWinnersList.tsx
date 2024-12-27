import { LotteryWinnerData, LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';
import LotteryWinner from './LotteryWinner';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 } from 'uuid';

const LotteryWinnersList = ({ winners }: { winners: LotteryWinnerDataSimplified[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1028px]">
      <div className="flex flex-col gap-2 w-full md:pb-4 pb-3 border-b border-[#CECCFF]">
        <h4 className="font-heading-3-regular">Results</h4>
        <p className="font-base-medium">The results after each stage will be shown here.</p>
      </div>
      <motion.div
        layout
        className="grid grid-cols-3 gap-x-2 gap-y-4 w-full h-[244px] overflow-y-auto lottery-scrollbar">
        <AnimatePresence mode="popLayout">
          {winners.map((item, index) => (
            <LotteryWinner
              key={v4()}
              phone={item.client}
              ticket={item.ticket}
              winnerNumber={item.winner_no}
              isNew={index === winners.length - 1}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default LotteryWinnersList;
