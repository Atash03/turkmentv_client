"use client";
import { calculateTimeLeft } from "@/lib/hooks/useCalculateTimeLeft";
import { useLotteryStatus } from "@/store/store";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

interface LotteryCountDownProps {
  startDate: string; // Event start date in "YYYY-MM-DD HH:mm:ss" format
  endDate: string; // Event end date in "YYYY-MM-DD HH:mm:ss" format
  lotteryStatus: "Upcoming" | "Ongoing" | "Finished";
}

const LotteryCountDown: React.FC<LotteryCountDownProps> = ({
  startDate,
  endDate,
  lotteryStatus,
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { status, setStatus } = useLotteryStatus();

  useEffect(() => {
    setStatus(lotteryStatus);

    const timer = setInterval(() => {
      if (lotteryStatus === "Upcoming") {
        const timeToStart = calculateTimeLeft(startDate);
        setTimeLeft(timeToStart);

        if (
          timeToStart.hours === 0 &&
          timeToStart.minutes === 0 &&
          timeToStart.seconds === 0
        ) {
          setStatus("Ongoing"); // Update status to "started"
        }
      } else if (lotteryStatus === "Ongoing") {
        const timeToEnd = calculateTimeLeft(endDate);
        setTimeLeft(timeToEnd);

        if (
          timeToEnd.hours === 0 &&
          timeToEnd.minutes === 0 &&
          timeToEnd.seconds === 0
        ) {
          setStatus("Finished"); // Update status to "finished"
        }
      }
    }, 1000);

    return () => clearInterval(timer); // Clean up interval on component unmount
  }, [startDate, endDate, lotteryStatus]);

  return (
    <div className="bg-lightPrimaryContainer sm:p-6 py-3 flex flex-col w-full md:gap-2 rounded-[12px] sm:gap-3 gap-0 text-lightOnPrimaryContainer">
      <h3 className="text-center md:font-heading-1-regular sm:text-[32px] sm:leading-[40px] text-[20px] leading-[28px] text-lightOnSurface">
        {status === "Ongoing"
          ? "Çeklis dowam edýär"
          : status === "Finished"
          ? "Çeklisx tamamlandy"
          : null}
      </h3>
      {/* LotteryCountDown */}
      {status === "Upcoming" && (
        <div className="flex items-center sm:gap-6 gap-2 justify-between">
          <div className="flex flex-col items-center justify-center flex-1 sm:p-6 p-4 sm:pb-3">
            <h3 className="md:text-[80px] sm:text-[56px] text-[28px] md:leading-[88px] sm:leading-[64px] leading-[36px] -tracking-[1%]">
              {timeLeft.hours}
            </h3>
          </div>

          {/* Dots */}
          <div className="flex flex-col sm:gap-3 gap-2">
            <div className="sm:w-3 sm:h-3 w-1 h-1 rounded-full bg-lightOnSurfaceVariant"></div>
            <div className="sm:w-3 sm:h-3 w-1 h-1 rounded-full bg-lightOnSurfaceVariant"></div>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 sm:p-6 p-4 sm:pb-3">
            <h3 className="md:text-[80px] sm:text-[56px] text-[28px] md:leading-[88px] sm:leading-[64px] leading-[36px] -tracking-[1%]">
              {timeLeft.minutes}
            </h3>
          </div>

          {/* Dots */}
          <div className="flex flex-col sm:gap-3 gap-2">
            <div className="sm:w-3 sm:h-3 w-1 h-1 rounded-full bg-lightOnSurfaceVariant"></div>
            <div className="sm:w-3 sm:h-3 w-1 h-1 rounded-full bg-lightOnSurfaceVariant"></div>
          </div>

          <div className="flex flex-col items-center justify-center flex-1 sm:p-6 p-4 sm:pb-3">
            <h3 className="md:text-[80px] sm:text-[56px] text-[28px] md:leading-[88px] sm:leading-[64px] leading-[36px] -tracking-[1%]">
              {timeLeft.seconds}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryCountDown;
