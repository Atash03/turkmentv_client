import LotteryCountDown from "@/components/lottery/countDown/LotteryCountDown";
import SpinWheel from "@/components/lottery/spinWheel/SpinWheel";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-[128px] font-roboto pt-[64px] pb-[128px] text-lightOnSurface">
      <section className="">
        <div className="container">
          <div className="flex flex-col gap-[32px]">
            <h1 className="font-display-1-regular text-center">Bije</h1>
            <div className="mb-8">
              <Image
                src="/banner-lottery.jpg"
                width={1416}
                height={177}
                alt="banner"
                className="rounded-[12px]"
              />
            </div>

            <LotteryCountDown startDate="2024-11-25" />
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex gap-6 bg-lightSurfaceContainer rounded-[12px]">
            {/* Winners */}
            <div className="flex flex-col w-full p-8 gap-4">
              <div className="flex flex-col gap-2 pb-4 border-b border-lightOutlineVariant">
                <h4 className="font-heading-3-regular">Results</h4>
                <p className="font-base-medium">
                  The results after each stage will be shown here.
                </p>
              </div>

              {/* {[...Array(5)].map((item, index) => (
                <div className="flex flex-col gap-2 pb-4 last:border-none border-b border-lightOutlineVariant">
                  <h4 className="font-heading-5-regular">The winner of the {index + 1} stage:</h4>
                  <p className="font-base-medium">8 XX XX-XX-XX</p>
                </div>
              ))} */}
            </div>

            {/* Sping the wheel */}
            <div className="flex justify-center items-center w-full h-full px-8 py-[29px]">
              <SpinWheel />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="flex flex-col gap-8">
            <h2 className="font-heading-1-regular">Lotereýanyň duzgunleri:</h2>
            <div className="flex gap-6">
              <div className="flex flex-col gap-4 bg-lightSurfaceContainer py-4 px-8 rounded-[12px] w-full">
                <h3 className="font-heading-5-regular">Umumy düzgünler:</h3>
                <ul className="list-disc flex flex-col gap-4 pl-[16px]">
                  {Array(5)
                    .fill(" ")
                    .map((item, i) => (
                      <li className="font-small-regular" key={i}>
                        Ilkinji we dogry jogap beren sanawda ilkinji ýeri
                        eýelýär
                      </li>
                    ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 bg-lightSurfaceContainer py-4 px-8 rounded-[12px] w-full">
                <h3 className="font-heading-5-regular">Üns beriň:</h3>
                <ul className="list-disc flex flex-col gap-4 pl-[16px]">
                  {Array(1)
                    .fill(" ")
                    .map((item) => (
                      <li className="font-small-regular">SMS = 1 manat</li>
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
