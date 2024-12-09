'use client';

import { Queries } from '@/api/queries';
import LotteryWinnersSection from '@/components/lottery/LotteryWinnersSection';
import LotteryCountDown from '@/components/lottery/countDown/LotteryCountDown';
import { ILottery } from '@/models/lottery/lottery.model';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<ILottery>();
  const [lotteryStatus, setLotteryStatus] = useState<'not-started' | 'started' | 'ended'>(
    'not-started',
  );

  useEffect(() => {
    Queries.getLottery()
      .then((res) => {
        setIsLoading(true);
        setData(res);
      })
      .finally(() => setIsLoading(false));
  }, []);

  console.log(lotteryStatus);

  return (
    <div className="flex flex-col gap-[128px] font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] pb-[128px] text-lightOnSurface">
      {data && (
        <section className="">
          <div className="container">
            <div className="flex flex-col md:gap-[32px] gap-[24px]">
              <div className="flex flex-col gap-[24px] items-center ">
                <h1 className="sm:font-display-1-regular text-[32px] leading-[40px] text-center">
                  {data.data.title}
                </h1>
                <p className="max-w-[600px] w-full font-base-regular text-center">
                  {data.data.description}
                </p>
                <p className="p-2 font-heading-5-medium bg-lightTertiaryContainer text-lightOnTertiaryContainer">
                  SMS-kod: {data.data.sms_code}
                </p>
              </div>
              <div className="md:mb-8 sm:mb-[40px] mb-[16px]">
                <Image
                  src="/banner-lottery.jpg"
                  width={1416}
                  height={177}
                  alt="banner"
                  className="rounded-[12px] object-cover h-[177px]"
                />
              </div>

              {/* {lotteryStatus === 'started' ||
                (lotteryStatus === 'not-started' && (
                  <LotteryCountDown
                    startDate={data.data.start_time}
                    endDate={data.data.end_time}
                    lotteryStatus={lotteryStatus}
                    setLotteryStatus={setLotteryStatus}
                  />
                ))} */}

              {lotteryStatus === 'not-started' || lotteryStatus === 'started' ? (
                <LotteryCountDown
                  // startDate={data.data.start_time}
                  // endDate={data.data.end_time}
                  startDate={'2024-12-10 16:15:00'}
                  endDate={'2024-12-11 16:00:00'}
                  lotteryStatus={lotteryStatus}
                  setLotteryStatus={setLotteryStatus}
                />
              ) : null}
            </div>
          </div>
        </section>
      )}

      {lotteryStatus === 'started' || (lotteryStatus === 'ended' && <LotteryWinnersSection />)}

      <section>
        <div className="container">
          <div className="flex flex-col gap-8">
            <h2 className="font-heading-1-regular">Lotereýanyň duzgunleri:</h2>
            <div className="flex gap-6">
              <div className="flex flex-col gap-4 bg-lightSurfaceContainer py-4 px-8 rounded-[12px] w-full">
                <h3 className="font-heading-5-regular">Umumy düzgünler:</h3>
                <ul className="list-disc flex flex-col gap-4 pl-[16px]">
                  {Array(5)
                    .fill(' ')
                    .map((item, i) => (
                      <li className="font-small-regular" key={i}>
                        Ilkinji we dogry jogap beren sanawda ilkinji ýeri eýelýär
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 bg-lightSurfaceContainer py-4 px-8 rounded-[12px] w-full">
                <h3 className="font-heading-5-regular">Üns beriň:</h3>
                <ul className="list-disc flex flex-col gap-4 pl-[16px]">
                  {Array(1)
                    .fill(' ')
                    .map((item, i) => (
                      <li className="font-small-regular" key={i}>
                        SMS = 1 manat
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
