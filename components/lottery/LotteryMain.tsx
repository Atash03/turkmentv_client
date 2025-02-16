"use client";
import LotteryHeader from "@/components/lottery/LotteryHeader";
import LotteryRulesSection from "@/components/lottery/rules/LotteryRulesSection";
import LotteryCountDown from "@/components/lottery/countDown/LotteryCountDown";
import Link from "next/link";
import { authenticateLottery } from "@/api";
import { useRouter } from "next/navigation";
import { getLotteryStatus } from "@/lib/actions";
import LotteryWinners from "./LotteryWinners";
import { useEffect, useState } from "react";

const LotteryMain = () => {
  const [lotteryData, setLotteryData] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const phone = localStorage.getItem("phoneNumber");
      const key = localStorage.getItem("key");
      if (phone && key) {
        const res = await authenticateLottery(phone, key);
        setLotteryData(res);
      } else {
        localStorage.clear();
        router.push("/b/auth");
      }
    }

    getData();
  }, []);

  const status = getLotteryStatus(
    lotteryData?.data.start_time,
    lotteryData?.data.end_time
  );

  return lotteryData?.errorMessage ? (
    <div className="flex flex-1 w-full justify-center items-center">
      <h1 className="text-[50px]">{lotteryData.errorMessage}</h1>
    </div>
  ) : (
    lotteryData?.data && (
      <div className="flex flex-col font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] ms:pb-[128px] pb-[80px] text-lightOnSurface">
        <div className="flex flex-col sm:gap-[64px] gap-[40px] pb-[80px]">
          <LotteryHeader
            title={lotteryData?.data.title}
            description={lotteryData?.data.description}
            image={lotteryData?.data.image}
            smsCode={lotteryData?.data.sms_code}
            startDate={lotteryData?.data.start_time}
          />

          {status === "Upcoming" && (
            <div className="container">
              <LotteryCountDown
                lotteryStatus={status}
                endDate={lotteryData.data.end_time}
                startDate={lotteryData.data.start_time}
              />
            </div>
          )}
        </div>
        <LotteryRulesSection data={lotteryData} />
        <div className="flex flex-col gap-10 mt-[40px]">
          <LotteryWinners data={lotteryData} lotteryStatus={status} />
          <div className="w-full">
            <div className="container">
              <Link
                href="/b/auth"
                className="sm:text-textLarge sm:leading-textLarge text-[16px] rounded-full leading-[24px] sm:py-[12px] py-[8px] w-full flex justify-center items-center border-2 border-lightPrimary  hover:bg-lightPrimary font-medium text-lightPrimary hover:text-lightOnPrimary disabled:opacity-50 transition-all duration-300"
              >
                Çykmak
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default LotteryMain;
