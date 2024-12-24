'use client';

import LotteryWinnersList from './winners/LotteryWinnersList';
import SpinWheel from './spinWheel/SpinWheel';
import { useState, useEffect } from 'react';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import { LotteryWinnerData } from '@/typings/lottery/lottery.types';
import RollingCounter from './RollingCounter/RollingCounter';

const LotteryWinnersSection = () => {
  const [winners, setWinners] = useState<LotteryWinnerData[]>([]);

  const { lotteryData } = useLotteryAuth();

  useEffect(() => {
    if (lotteryData?.data.winners) {
      setWinners(lotteryData.data.winners);
    }

    const wsUrl = 'https://sms.turkmentv.gov.tm/api/ws/lottery';
    const ws = new WebSocket(wsUrl);

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      const newWinner = JSON.parse(event.data);
      console.log('Parsed WebSocket data:', newWinner);
      setWinners((prev) => [...prev, newWinner]);
    };

    return () => {
      ws.close();
    };
  }, [lotteryData]);

  return (
    <section>
      <div className="container">
        <div>
          <div className="flex gap-6 bg-lightSurfaceContainer rounded-[12px] flex-1">
            {/* Winners */}
            <LotteryWinnersList winners={winners} />

            {/* Sping the wheel */}
            <div className="flex justify-center items-center md:w-full h-full md:px-8 md:py-[29px] p-6">
              {/* <SpinWheel setWinners={setWinners} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
