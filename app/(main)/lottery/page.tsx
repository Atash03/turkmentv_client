'use client';

import { useState } from 'react';
import { useLotteryAuth } from '@/store/useLotteryAuth';
import ProtectedRoute from '@/components/lottery/auth/ProtectedRoute';
import LotteryHeader from '@/components/lottery/LotteryHeader';

import LotteryWinnersSection from '@/components/lottery/LotteryWinnersSection';
import LotteryRulesSection from '@/components/lottery/rules/LotteryRulesSection';
import LotteryCountDown from '@/components/lottery/countDown/LotteryCountDown';
import LotteryCountDownAllert from '@/components/lottery/countDown/countDownAllert/LotteryCountDownAllert';
import { LotteryWinnerDataSimplified } from '@/typings/lottery/lottery.types';

const LotteryPage = () => {
  const { lotteryData } = useLotteryAuth();
  const [status, setStatus] = useState<'not-started' | 'started' | 'ended'>('not-started');

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:gap-[128px] gap-[80px] font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] ms:pb-[128px] pb-[80px] text-lightOnSurface">
        {lotteryData && (
          <div className="flex flex-col sm:gap-[64px] gap-[40px]">
            <LotteryHeader
              title={lotteryData.data.title}
              description={lotteryData.data.description}
              image={lotteryData.data.image}
              smsCode={lotteryData.data.sms_code}
              startDate={lotteryData.data.start_time}
            />

            {status === 'not-started' ? (
              <div className="container">
                <LotteryCountDown
                  lotteryStatus={status}
                  setLotteryStatus={setStatus}
                  endDate={lotteryData.data.end_time}
                  startDate={lotteryData.data.start_time}
                />
              </div>
            ) : null}
          </div>
        )}

        <LotteryRulesSection />

        {lotteryData && (status === 'ended' || status === 'started') && (
          <LotteryWinnersSection lotteryStatus={status} />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default LotteryPage;
