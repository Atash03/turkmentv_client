import { useLotteryAuth } from "@/store/useLotteryAuth";

const LotteryRulesSection = () => {
  const { lotteryData } = useLotteryAuth();

  return (
    <section>
      <div className="container">
        <div className="flex flex-col md:gap-8 gap-6">
          <h2 className="md:font-heading-1-regular text-[32px] leading-[40px]">
            Lotereýanyň duzgunleri:
          </h2>
          <div className="flex gap-6">
            <div className="flex flex-col md:gap-4 gap-2 bg-lightSurfaceContainer py-4 md:px-8 px-6 rounded-[12px] w-full">
              <h3 className="md:font-heading-5-regular text-[20px] leading-[24px]">
                Umumy düzgünler:
              </h3>
              <ul className="list-disc flex flex-col md:gap-4 gap-2 pl-[16px]">
                {Array(5)
                  .fill(" ")
                  .map((item, i) => (
                    <li className="font-small-regular" key={i}>
                      Ilkinji we dogry jogap beren sanawda ilkinji ýeri eýelýär
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col md:gap-4 gap-2 bg-lightSurfaceContainer py-4 md:px-8 px-6 rounded-[12px] w-full">
              <h3 className="md:font-heading-5-regular text-[20px] leading-[24px]">
                Üns beriň:
              </h3>
              <ul className="list-disc flex flex-col md:gap-4 gap-2 pl-[16px]">
                {Array(1)
                  .fill(" ")
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
  );
};

export default LotteryRulesSection;
