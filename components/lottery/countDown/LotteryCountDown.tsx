"use client";

import { calculateTimeLeft } from "@/lib/hooks/useCalculateTimeLeft";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface LotteryCountDownProps {
  startDate: string; // Event start date in "YYYY-MM-DD HH:mm:ss" format
  endDate: string; // Event end date in "YYYY-MM-DD HH:mm:ss" format
  lotteryStatus: string;
  setLotteryStatus: Dispatch<
    SetStateAction<"not-started" | "started" | "ended">
  >;
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (lotteryStatus === "not-started") {
        const timeToStart = calculateTimeLeft(startDate);
        setTimeLeft(timeToStart);

        if (
          timeToStart.hours === 0 &&
          timeToStart.minutes === 0 &&
          timeToStart.seconds === 0
        ) {
          setLotteryStatus("started"); // Update status to "started"
        }
      } else if (lotteryStatus === "started") {
        const timeToEnd = calculateTimeLeft(endDate);
        setTimeLeft(timeToEnd);

        if (
          timeToEnd.hours === 0 &&
          timeToEnd.minutes === 0 &&
          timeToEnd.seconds === 0
        ) {
          setLotteryStatus("ended"); // Update status to "finished"
        }
      }
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [startDate, endDate, lotteryStatus, setLotteryStatus]);

  console.log(lotteryStatus);

  return (
    <div className="bg-lightPrimaryContainer sm:p-6 p-2 flex flex-col w-full md:gap-2 rounded-[12px] text-lightOnPrimaryContainer">
      <h3 className="text-center md:font-heading-1-regular text-[32px] leading-[40px] text-lightOnSurface">
        {lotteryStatus === "started"
          ? "Bije dowam edýär"
          : lotteryStatus === "ended"
          ? "Bije tamamlandy"
          : "Bije"}
      </h3>
      {/* LotteryCountDown */}
      {lotteryStatus === "not-started" && (
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
            <div className="w-3 h-3 rounded-full bg-lightOnSurfaceVariant"></div>
            <div className="w-3 h-3 rounded-full bg-lightOnSurfaceVariant"></div>
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
            <div className="w-3 h-3 rounded-full bg-lightOnSurfaceVariant"></div>
            <div className="w-3 h-3 rounded-full bg-lightOnSurfaceVariant"></div>
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
      )}

      <div className="flex items-center justify-center text-lightOnSurfaceVariant md:font-heading-1-regular md:text-[20px] sm:text-[18px] sm:leading-[28px] text-[14px] leading-[20px]">
        <span>
          {lotteryStatus === "not-started"
            ? "- den başlar"
            : lotteryStatus === "started"
            ? "girmek üçin aşakda kodyňyzy giriziň"
            : "netijeleri görmek üçin aşakda kodyňyzy giriziň"}
        </span>
      </div>
    </div>
  );
};

export default LotteryCountDown;
