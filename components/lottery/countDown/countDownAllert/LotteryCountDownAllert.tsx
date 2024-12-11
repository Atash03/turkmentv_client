'use client';

import { calculateTimeLeft } from '@/lib/hooks/useCalculateTimeLeft';
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

interface LotteryCountDownAllertProps {
  startDate: string; // Event start date in "YYYY-MM-DD HH:mm:ss" format
  endDate: string; // Event end date in "YYYY-MM-DD HH:mm:ss" format
  lotteryStatus: string;
  setLotteryStatus: Dispatch<SetStateAction<'not-started' | 'started' | 'ended'>>;
}

const LotteryCountDownAllert: React.FC<LotteryCountDownAllertProps> = ({
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
    <div className="container">
      <div className="flex items-center px-4 py-3 gap-2 font-base-medium text-lightOnWarningAllertContainer bg-lightWarningAllertContainer border border-lightWarningAllertContainerOutline rounded-[4px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.5697 2.04313C11.0063 1.79718 11.4989 1.66797 12 1.66797C12.5011 1.66797 12.9937 1.79718 13.4303 2.04313C13.8668 2.28908 14.2326 2.64345 14.4923 3.07202L14.4949 3.07641L22.6009 16.6124L22.6093 16.6266C22.8633 17.0672 22.9976 17.5665 22.9989 18.0751C23.0002 18.5836 22.8683 19.0836 22.6165 19.5254C22.3646 19.9672 22.0016 20.3354 21.5634 20.5934C21.1251 20.8514 20.627 20.9903 20.1185 20.9961L20.107 20.9963L3.88175 20.9962C3.37303 20.9905 2.87466 20.8516 2.43623 20.5935C1.9978 20.3354 1.63458 19.967 1.38269 19.525C1.13081 19.083 0.999043 18.5827 1.0005 18.074C1.00196 17.5652 1.13659 17.0657 1.391 16.6251L1.39909 16.6114L9.48906 3.10414C9.49507 3.09333 9.50129 3.08262 9.50771 3.07202C9.76736 2.64345 10.1331 2.28908 10.5697 2.04313ZM12 3.66797C11.8428 3.66797 11.6883 3.7085 11.5514 3.78564C11.4208 3.85921 11.3104 3.96371 11.2298 4.08983C11.2269 4.09491 11.2239 4.09998 11.2209 4.10501L3.11973 17.6309C3.04203 17.7677 3.00094 17.9223 3.00049 18.0797C3.00004 18.2393 3.04136 18.3962 3.12037 18.5348C3.19938 18.6735 3.3133 18.789 3.45082 18.87C3.58702 18.9501 3.74166 18.9936 3.89964 18.9962H20.1002C20.258 18.9936 20.4125 18.9501 20.5486 18.8699C20.6861 18.789 20.8 18.6735 20.879 18.535C20.958 18.3964 20.9993 18.2395 20.9989 18.08C20.9985 17.9228 20.9576 17.7683 20.88 17.6316L12.7817 4.10836C12.7813 4.10775 12.781 4.10715 12.7806 4.10654C12.6992 3.97293 12.5849 3.86244 12.4486 3.78564C12.3117 3.7085 12.1572 3.66797 12 3.66797ZM12 8.00024C12.5523 8.00024 13 8.44796 13 9.00024V13.0002C13 13.5525 12.5523 14.0002 12 14.0002C11.4477 14.0002 11 13.5525 11 13.0002V9.00024C11 8.44796 11.4477 8.00024 12 8.00024ZM11 16.0002C11 15.448 11.4477 15.0002 12 15.0002H12.01C12.5623 15.0002 13.01 15.448 13.01 16.0002C13.01 16.5525 12.5623 17.0002 12.01 17.0002H12C11.4477 17.0002 11 16.5525 11 16.0002Z"
            fill="#F57C00"
          />
        </svg>

        {lotteryStatus !== 'ended' ? (
          <span>
            Bije {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}-dan(den) tamamlanýar
          </span>
        ) : (
          <span>Bije tamamlandy</span>
        )}
      </div>
    </div>
  );
};

export default LotteryCountDownAllert;
