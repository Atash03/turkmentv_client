"use client";

import { useEffect, useState } from "react";
import { useLotteryAuth } from "@/store/useLotteryAuth";
import ProtectedRoute from "@/components/lottery/auth/ProtectedRoute";
import LotteryHeader from "@/components/lottery/LotteryHeader";

import LotteryWinnersSection from "@/components/lottery/LotteryWinnersSection";
import LotteryRulesSection from "@/components/lottery/rules/LotteryRulesSection";
import LotteryCountDown from "@/components/lottery/countDown/LotteryCountDown";
import { Queries } from "@/api/queries";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { authenticateLottery } from "@/api";
import { ILotteryResponse } from "@/models/lottery/lottery.model";

const LotteryPage = () => {
  const [lotteryData, setData] = useState<ILotteryResponse>();
  const [status, setStatus] = useState<"not-started" | "started" | "ended">(
    "not-started"
  );
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await authenticateLottery();
      setData(res);
    };

    checkAuth();
  }, []);

  if (isLoading && !lotteryData?.data) {
    <div className="flex w-full h-[90vh] justify-center items-center">
      <Loader />
    </div>;
  }

  return (
    <ProtectedRoute>
      {lotteryData?.data && (
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

              {status === "not-started" ? (
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

          <div className="flex flex-col gap-10">
            {lotteryData && (status === "ended" || status === "started") && (
              <LotteryWinnersSection lotteryStatus={status} />
            )}
            <div className="w-full">
              <div className="container">
                <Link
                  href="/lottery/auth"
                  className="sm:text-textLarge sm:leading-textLarge text-[16px] rounded-full leading-[24px] sm:py-[12px] py-[8px] w-full flex justify-center items-center border-2 border-lightPrimary  hover:bg-lightPrimary font-medium text-lightPrimary hover:text-lightOnPrimary disabled:opacity-50 transition-all duration-300"
                >
                  Çykmak
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default LotteryPage;
