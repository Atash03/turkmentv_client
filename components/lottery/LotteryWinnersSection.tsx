'use client';

import LotteryWinnersList from './winners/LotteryWinnersList';
import { useState, useEffect } from 'react';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import { LotteryWinnerData } from '@/typings/lottery/lottery.types';
import LotterySlotCounter from './slotCounter/LotterySlotCounter';
import Confetti from 'react-confetti/dist/types/Confetti';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const LotteryWinnersSection = () => {
  const [winners, setWinners] = useState<LotteryWinnerData[]>([]);
  const [currentNumber, setCurrentNumber] = useState<string>('00-00-00-00-00');
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const { width, height } = useWindowSize();

  const { lotteryData } = useLotteryAuth();

  useEffect(() => {
    if (lotteryData?.data.winners) {
      setWinners(lotteryData.data.winners);
      setCurrentNumber(lotteryData.data.winners.at(-1)?.ticket || '00-00-00-00-00');
    }

    const wsUrl = 'https://sms.turkmentv.gov.tm/api/ws/lottery';
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket connected');
      setWsStatus('connected');
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setWsStatus('error');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsStatus('error');
    };

    ws.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
      const newWinner = JSON.parse(event.data);
      console.log('Parsed WebSocket data:', newWinner);
      setWinners((prev) => [...prev, newWinner]);

      setTimeout(() => {
        setIsConfettiActive(true);
        setTimeout(() => {
          setIsConfettiActive(false);
        }, 5000);
      }, 10000);
    };

    return () => {
      ws.close();
    };
  }, [lotteryData]);

  return (
    <section>
      {wsStatus === 'error' && (
        <div className="text-red-500 text-center mb-2">
          Connection error. Please refresh the page.
        </div>
      )}

      {isConfettiActive && (
        <div className="fixed top-0 left-0 z-50">
          <ReactConfetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={1000}
            tweenDuration={10000}
            run={true}
            colors={[
              'linear-gradient(45deg, #5D5D72, #8589DE)',
              'linear-gradient(45deg, #E1E0FF, #575992)',
              '#8589DE',
              '#575992',
              '#E1E0FF',
              '#BA1A1A',
            ]}
          />
        </div>
      )}

      <div className="container">
        <div className="flex flex-col  items-center">
          <div className="-mb-[90px] z-10">
            <LotterySlotCounter numberString={currentNumber} />
          </div>
          <div className="flex gap-6 bg-lightPrimaryContainer rounded-[12px] flex-1 w-full items-center justify-center pt-[122px] pb-[62px]">
            {/* Winners */}
            <LotteryWinnersList winners={winners} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LotteryWinnersSection;
