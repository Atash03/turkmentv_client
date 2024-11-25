'use client';

import LotteryWinnersList from './winners/LotteryWinnersList';
import SpinWheel from './spinWheel/SpinWheel';
import { useState } from 'react';

const LotteryWinnersSection = () => {
  const [winners, setWinners] = useState<number[]>([]);

  return (
    <section>
      <div className="container">
        <div className="flex gap-6 bg-lightSurfaceContainer rounded-[12px]">
          {/* Winners */}
          <LotteryWinnersList winners={winners} />

          {/* Sping the wheel */}
          <div className="flex justify-center items-center w-full h-full px-8 py-[29px]">
            <SpinWheel setWinners={setWinners} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
