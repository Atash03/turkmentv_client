"use client";

import { motion } from "framer-motion";

interface IProps {
  phone: string;
  ticket: string;
  isNew: boolean;
  winnerNumber: number;
}

const LotteryWinner = ({ phone, ticket, isNew, winnerNumber }: IProps) => {
  return (
    <motion.div
      layout
      initial={isNew ? { opacity: 0, translateY: 20 } : false}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-2 md:pb-4 pb-3 border-b w-full border-[#CECCFF]"
    >
      <h4 className="md:font-heading-6-regular text-[20px] leading-[28px]">
        The winner of the {winnerNumber} stage:
      </h4>
      <div className="flex items-center gap-4">
        <p className="md:font-base-medium font-base-regular">{phone}</p>
        <div className="w-1 h-1 rounded-full bg-lightOnSurfaceVariant"></div>
        <p className="md:font-base-medium font-base-regular">{ticket}</p>
      </div>
    </motion.div>
  );
};

export default LotteryWinner;
