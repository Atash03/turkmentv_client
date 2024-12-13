'use client';

import LotteryWinnersList from './winners/LotteryWinnersList';
import SpinWheel from './spinWheel/SpinWheel';
import { useState } from 'react';

const LotteryWinnersSection = () => {
  const [winners, setWinners] = useState<number[]>([1, 2, 3, 4, 5, 5, 5, 5]);

  return (
    <section>
      <div className="container">
        <div className="flex gap-6 bg-lightSurfaceContainer rounded-[12px] flex-1">
          {/* Winners */}
          <LotteryWinnersList winners={winners} />

          {/* Sping the wheel */}
          <div className="flex justify-center items-center md:w-full h-full md:px-8 md:py-[29px] p-6">
            <SpinWheel setWinners={setWinners} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
