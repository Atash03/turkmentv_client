import { useState, useEffect } from 'react';
import { LotteryStatus } from '@/typings/lottery/lottery.types';

export const useLottery = (startDate: string, endDate: string) => {
  const [status, setStatus] = useState<LotteryStatus>('not-started');
  const [currentNumber, setCurrentNumber] = useState('22-22-22-22-22');

  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (now < start) return 'not-started';
      if (now > end) return 'ended';
      return 'started';
    };

    setStatus(calculateStatus());
    const interval = setInterval(() => {
      setStatus(calculateStatus());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);

  useEffect(() => {
    if (status === 'started') {
      const timer = setTimeout(() => {
        setCurrentNumber('81-34-52-35-61');
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return {
    status,
    setStatus,
    currentNumber,
  };
};
