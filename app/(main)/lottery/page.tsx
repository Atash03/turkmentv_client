"use client";

import { useLotteryAuth } from "@/store/useLotteryAuth";
import ProtectedRoute from "@/components/lottery/auth/ProtectedRoute";
import { useLottery } from "@/lib/hooks/useLottery";
import { LOTTERY_CONFIG } from "@/constants/lottery";
import LotteryHeader from "@/components/lottery/LotteryHeader";
import LotteryCounter from "@/components/lottery/RollingCounter/RollingCounter";

import LotteryWinnersSection from "@/components/lottery/LotteryWinnersSection";
import LotteryRulesSection from "@/components/lottery/rules/LotteryRulesSection";

const LotteryPage = () => {
  const { lotteryData } = useLotteryAuth();
  const { status, currentNumber } = useLottery(
    LOTTERY_CONFIG.START_DATE,
    LOTTERY_CONFIG.END_DATE
  );

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:gap-[128px] gap-[80px] font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] pb-[128px] text-lightOnSurface">
        {lotteryData && (
          <LotteryHeader
            title={lotteryData.data.title}
            description={lotteryData.data.description}
            image={lotteryData.data.image}
            smsCode={lotteryData.data.sms_code}
          />
        )}

        <LotteryRulesSection />

        {(status === "ended" || status === "started") && (
          <LotteryWinnersSection />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default LotteryPage;
