'use client';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface LotteryCountDownProps {
  startDate: string; // Event start date in "YYYY-MM-DD HH:mm:ss" format
  endDate: string; // Event end date in "YYYY-MM-DD HH:mm:ss" format
  lotteryStatus: string;
  setLotteryStatus: Dispatch<SetStateAction<'not-started' | 'started' | 'ended'>>;
}

const LotteryCountDown: React.FC<LotteryCountDownProps> = ({
  startDate,
  endDate,
  lotteryStatus,
  setLotteryStatus,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = (targetDate: string) => {
    const now = new Date();
    const eventDate = new Date(targetDate); // Parse target date directly
    const timeDifference = eventDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 }; // Countdown finished
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (lotteryStatus === 'not-started') {
        const timeToStart = calculateTimeLeft(startDate);
        setTimeLeft(timeToStart);

        if (timeToStart.hours === 0 && timeToStart.minutes === 0 && timeToStart.seconds === 0) {
          setLotteryStatus('started'); // Update status to "started"
        }
      } else if (lotteryStatus === 'started') {
        const timeToEnd = calculateTimeLeft(endDate);
        setTimeLeft(timeToEnd);

        if (timeToEnd.hours === 0 && timeToEnd.minutes === 0 && timeToEnd.seconds === 0) {
          setLotteryStatus('ended'); // Update status to "finished"
        }
      }
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [startDate, endDate, lotteryStatus, setLotteryStatus]);

  return (
    <div className="bg-lightPrimaryContainer sm:pb-4 pb-2 flex flex-col w-full gap-2 rounded-[12px] text-lightOnPrimaryContainer">
      {/* LotteryCountDown */}
      <div className="flex items-center sm:gap-6 gap-2 justify-between">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="md:text-[80px] sm:text-[56px] text-[28px] md:leading-[88px] sm:leading-[64px] leading-[36px] -tracking-[1%]">
            {timeLeft.hours}
          </h3>
          <h4 className="font-medium md:text-[20px] sm:text-[18px] text-[14px] sm:leading-[28px] leading-[20px] -tracking-[1%] text-lightOnSurfaceVariant">
            hours
          </h4>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-3 h-3 rounded-full bg-lightPrimaryOutline"></div>
          <div className="w-3 h-3 rounded-full bg-lightPrimaryOutline"></div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 sm:p-6 p-4 pb-3">
          <h3 className="md:text-[80px] sm:text-[56px] text-[28px] md:leading-[88px] sm:leading-[64px] leading-[36px] -tracking-[1%]">
            {timeLeft.minutes}
          </h3>
          <h4 className="font-medium md:text-[20px] sm:text-[18px] text-[14px] sm:leading-[28px] leading-[20px] -tracking-[1%] text-lightOnSurfaceVariant">
            minutes
          </h4>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-3 h-3 rounded-full bg-lightPrimaryOutline"></div>
          <div className="w-3 h-3 rounded-full bg-lightPrimaryOutline"></div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="md:text-[80px] sm:text-[56px] text-[28px] md:leading-[88px] sm:leading-[64px] leading-[36px] -tracking-[1%]">
            {timeLeft.seconds}
          </h3>
          <h4 className="font-medium md:text-[20px] sm:text-[18px] text-[14px] sm:leading-[28px] leading-[20px] -tracking-[1%] text-lightOnSurfaceVariant">
            seconds
          </h4>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full bg-lightPrimaryOutline h-[1px]"></div>

      <div className="flex items-center justify-center text-lightOnSurfaceVariant md:font-heading-1-regular md:text-[20px] sm:text-[18px] sm:leading-[28px] text-[14px] leading-[20px]">
        <span>
          {lotteryStatus === 'not-started'
            ? '- den başlar'
            : lotteryStatus === 'started'
            ? '- den gutatar'
            : 'gutardy'}
        </span>
      </div>
    </div>
  );
};

export default LotteryCountDown;
