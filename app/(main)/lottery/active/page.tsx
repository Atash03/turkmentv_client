'use client';

import { Queries } from '@/api/queries';
import Loader from '@/components/Loader';
import LotteryWinnersSection from '@/components/lottery/LotteryWinnersSection';
import LotteryCountDown from '@/components/lottery/countDown/LotteryCountDown';
import LotteryCountDownAllert from '@/components/lottery/countDown/countDownAllert/LotteryCountDownAllert';
import LotteryForm from '@/components/lottery/form/LotteryForm';
import LotteryRulesSection from '@/components/lottery/rules/LotteryRulesSection';
import { ILottery } from '@/models/lottery/lottery.model';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ILottery>();
  const [lotteryStatus, setLotteryStatus] = useState<'not-started' | 'started' | 'ended'>(
    'not-started',
  );

  useEffect(() => {
    Queries.getLottery()
      .then((res) => {
        setData(res);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[128px] font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] pb-[128px] text-lightOnSurface">
      {data && (
        <section className="">
          <div className="container">
            <div className="flex flex-col md:gap-[32px] gap-[24px]">
              <div className="flex flex-col gap-[24px] items-center ">
                {data.data.title && (
                  <h1 className="sm:font-display-1-regular text-[32px] leading-[40px] text-center">
                    {data.data.title}
                  </h1>
                )}
                {data.data.description && (
                  <p className="max-w-[600px] w-full font-base-regular text-center">
                    {data.data.description}
                  </p>
                )}
                {data.data.sms_code && (
                  <div className="px-4 py-3 font-base-medium flex items-center gap-2 bg-lightInfoAllertContainer text-lightOnInfoAllertContainer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2C14.6522 2 17.1957 3.05357 19.0711 4.92893C20.9464 6.8043 22 9.34784 22 12C22 13.3132 21.7413 14.6136 21.2388 15.8268C20.7362 17.0401 19.9997 18.1425 19.0711 19.0711C18.1425 19.9997 17.0401 20.7362 15.8268 21.2388C14.6136 21.7413 13.3132 22 12 22C10.6868 22 9.38642 21.7413 8.17317 21.2388C6.95991 20.7362 5.85752 19.9997 4.92893 19.0711C4.00035 18.1425 3.26375 17.0401 2.7612 15.8268C2.25866 14.6136 2 13.3132 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893ZM12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 13.0506 4.20693 14.0909 4.60896 15.0615C5.011 16.0321 5.60028 16.914 6.34315 17.6569C7.08601 18.3997 7.96793 18.989 8.93853 19.391C9.90914 19.7931 10.9494 20 12 20C13.0506 20 14.0909 19.7931 15.0615 19.391C16.0321 18.989 16.914 18.3997 17.6569 17.6569C18.3997 16.914 18.989 16.0321 19.391 15.0615C19.7931 14.0909 20 13.0506 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4ZM11 9C11 8.44772 11.4477 8 12 8H12.01C12.5623 8 13.01 8.44772 13.01 9C13.01 9.55228 12.5623 10 12.01 10H12C11.4477 10 11 9.55228 11 9ZM10 12C10 11.4477 10.4477 11 11 11H12C12.5523 11 13 11.4477 13 12V15C13.5523 15 14 15.4477 14 16C14 16.5523 13.5523 17 13 17H12C11.4477 17 11 16.5523 11 16V13C10.4477 13 10 12.5523 10 12Z"
                        fill="#1E3A5F"
                      />
                    </svg>
                    <span>SMS-kod: {data.data.sms_code}</span>
                  </div>
                )}
              </div>
              {data.data.image && (
                <div className="md:mb-8 sm:mb-[40px] mb-[16px]">
                  <Image
                    src={data.data.image}
                    width={1416}
                    height={177}
                    alt="banner"
                    className="rounded-[12px] object-cover h-[177px]"
                  />
                </div>
              )}

              <div className="bg-lightSurfaceContainer flex flex-col gap-6">
                <LotteryCountDown
                  startDate={'2024-12-9 16:15:00'}
                  endDate={'2024-12-10 16:00:00'}
                  lotteryStatus={lotteryStatus}
                  setLotteryStatus={setLotteryStatus}
                />
                <LotteryForm />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="flex flex-col gap-[40px]">
        {lotteryStatus === 'not-started' && (
          <LotteryCountDown
            startDate={'2024-12-9 16:15:00'}
            endDate={'2024-12-10 16:00:00'}
            lotteryStatus={lotteryStatus}
            setLotteryStatus={setLotteryStatus}
          />
        )}
        <LotteryCountDownAllert
          startDate={'2024-12-9 16:15:00'}
          endDate={'2024-12-10 16:00:00'}
          lotteryStatus={lotteryStatus}
          setLotteryStatus={setLotteryStatus}
        />
        <LotteryWinnersSection />
      </section>

      <LotteryRulesSection />
    </div>
  );
};

export default page;
