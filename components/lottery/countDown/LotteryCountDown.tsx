"use client";

import React, { useState, useEffect } from "react";

interface LotteryCountDownProps {
  startDate: string; // Event start date in "YYYY-MM-DD" format
}

const LotteryCountDown: React.FC<LotteryCountDownProps> = ({ startDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const eventDate = new Date(`${startDate}T00:00:00+05:00`); // Set the time to midnight UTC+5
    const timeDifference = eventDate.getTime() - now.getTime();

    if (timeDifference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 }; // Event has started or passed
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    // Update time left every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [startDate]);

  return (
    <div className="bg-lightSurfaceContainer pb-8 flex flex-col w-full gap-2 rounded-[12px]">
      {/* LotteryCountDown */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="text-[80px] leading-[88px] -tracking-[1%]">
            {timeLeft.hours}
          </h3>
          <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">
            hours
          </h4>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="text-[80px] leading-[88px] -tracking-[1%]">
            {timeLeft.minutes}
          </h3>
          <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">
            minutes
          </h4>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
          <div className="w-3 h-3 rounded-full bg-lightOutlineVariant"></div>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 p-6">
          <h3 className="text-[80px] leading-[88px] -tracking-[1%]">
            {timeLeft.seconds}
          </h3>
          <h4 className="font-medium text-[20px] leading-[28px] -tracking-[1%]">
            seconds
          </h4>
        </div>
      </div>

      {/* Separator */}
      <div className="w-full bg-lightOutlineVariant h-[1px]"></div>

      <div className="flex items-center justify-center text-lightOnSurface font-heading-1-regular">
        <span>-dan başlar</span>
      </div>
    </div>
  );
};

export default LotteryCountDown;
