import { LotteryWinnerData, LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';
import LotteryWinner from './LotteryWinner';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 } from 'uuid';

const LotteryWinnersList = ({ winners }: { winners: LotteryWinnerDataSimplified[] }) => {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[1028px]">
      <div className="flex flex-col gap-2 w-full pb-4 border-b border-[#CECCFF]">
        <h4 className="md:font-heading-3-regular text-[28px]">Ýeňijiler</h4>
        <p className="md:font-base-medium text-[16px]">
          The results after each stage will be shown here.
        </p>
      </div>
      <motion.div
        layout
        className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4 w-full ">
        {winners.map((item, index) => (
          <LotteryWinner
            key={v4()}
            phone={item.client}
            ticket={item.ticket}
            winnerNumber={item.winner_no}
            isNew={index === winners.length - 1}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LotteryWinnersList;
