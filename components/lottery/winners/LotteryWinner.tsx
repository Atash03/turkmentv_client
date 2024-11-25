'use client';

import { motion } from 'framer-motion';

interface IProps {
  index: number;
  number: string;
}

const LotteryWinner = ({ index, number }: IProps) => {
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
      className="flex flex-col gap-2 pb-4 last:border-none border-b border-lightOutlineVariant">
      <h4 className="font-heading-5-regular">The winner of the {index + 1} stage:</h4>
      <p className="font-base-medium">8 XX XX-XX-XX</p>
    </motion.div>
  );
};

export default LotteryWinner;
