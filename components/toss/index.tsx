"use client";
import LotteryHeader from "@/components/lottery/LotteryHeader";
import LotteryRulesSection from "@/components/lottery/rules/LotteryRulesSection";
import LotteryCountDown from "@/components/lottery/countDown/LotteryCountDown";
import { getTossData } from "@/api/queries";
import { getLotteryStatus } from "@/lib/actions";
import LotteryWinners from "../lottery/LotteryWinners";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const TossPage = ({ type, id }: { type: "bije" | "cekilis"; id: string }) => {
  const [tossData, setTossData] = useState<any>();
  const mobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const getData = async () => {
      setTossData(await getTossData({ type, id }));
    };

    getData();
  }, []);

  const status = getLotteryStatus(
    tossData?.data?.start_time,
    tossData?.data?.end_time
  );

  return (
    <>
      {tossData?.data ? (
        <div className="flex flex-col font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] ms:pb-[128px] pb-[80px] text-lightOnSurface">
          {tossData && (
            <div className="flex flex-col sm:gap-[64px] gap-[40px] pb-[40px]">
              <LotteryHeader
                title={tossData.data.title}
                description={tossData.data.description}
                image={
                  mobile ? tossData?.data.image_mobile : tossData?.data.image
                }
                smsCode={tossData.data.sms_code}
                startDate={tossData.data.start_time}
              />

              {status === "Upcoming" && (
                <div className="container">
                  <LotteryCountDown
                    lotteryStatus={status}
                    endDate={tossData.data.end_time}
                    startDate={tossData.data.start_time}
                  />
                </div>
              )}
            </div>
          )}

          <LotteryRulesSection show={false} data={tossData} />

          <div className="flex flex-col gap-10 mt-[40px]">
            <LotteryWinners data={tossData} lotteryStatus={status} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center md:gap-[128px] gap-[80px] font-roboto md:pt-[64px] sm:pt-[48px] pt-[40px] ms:pb-[128px] pb-[80px] text-lightOnSurface">
          <h1 className="text-[22px]">{tossData?.errorMessage}</h1>
        </div>
      )}
    </>
  );
};

export default TossPage;
