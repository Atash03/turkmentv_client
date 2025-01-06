import { useLotteryAuth } from '@/store/useLotteryAuth';

const LotteryRulesSection = () => {
  const { lotteryData } = useLotteryAuth();

  return (
    <section>
      <div className="container">
        <div className="flex flex-col md:gap-8 gap-6">
          <h2 className="md:font-heading-1-regular sm:text-[32px] text-[26px] sm:leading-[40px] leading-[34px]">
            Bijäniň düzgünleri:
          </h2>

          <div className="flex sm:flex-row flex-col gap-6">
            <div className="flex flex-col md:gap-4 sm:gap-2 gap-4 bg-lightSurfaceContainer sm:py-4 md:px-8 sm:px-6 py-3 px-4 rounded-[12px] w-full">
              <h3 className="md:font-heading-5-regular sm:text-[20px] text-[18px] sm:leading-[24px] leading-[28px]">
                Umumy düzgünler:
              </h3>
              <ul className="list-disc flex flex-col md:gap-4 gap-2 pl-[16px]">
                {Array(5)
                  .fill(' ')
                  .map((item, i) => (
                    <li className="font-small-regular" key={i}>
                      Ilkinji we dogry jogap beren sanawda ilkinji ýeri eýelýär
                    </li>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col md:gap-4 sm:gap-2 gap-4 bg-lightSurfaceContainer sm:py-4 md:px-8 sm:px-6 py-3 px-4 rounded-[12px] w-full">
              <h3 className="md:font-heading-5-regular sm:text-[20px] text-[18px] sm:leading-[24px] leading-[28px]">
                Siziň açar sözleriňiz:
              </h3>
              <ul className="list-disc flex flex-col md:gap-4 gap-2 pl-[16px]">
                {lotteryData?.user_lottery_numbers.map((item, i) => (
                  <li className="font-small-regular" key={i}>
                    {item}
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
