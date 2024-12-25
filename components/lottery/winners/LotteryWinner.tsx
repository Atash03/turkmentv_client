'use client';

import { motion } from 'framer-motion';

interface IProps {
  index: number;
  phone: string;
  ticket: string;
}

const LotteryWinner = ({ index, phone, ticket }: IProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: 20,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      className="flex flex-col gap-2 md:pb-4 pb-3  border-b w-full border-[#CECCFF]">
      <h4 className="md:font-heading-6-regular text-[20px] leading-[28px]">
        The winner of the {index + 1} stage:
      </h4>
      <div className="flex items-center gap-4">
        <p className="font-base-medium">{phone}</p>
        <div className="w-1 h-1 rounded-full bg-lightOnSurfaceVariant"></div>
        <p className="font-base-medium">{ticket}</p>
      </div>
    </motion.div>
  );
};

export default LotteryWinner;
