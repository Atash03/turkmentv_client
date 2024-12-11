const LotteryRulesSection = () => {
  return (
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
  );
};

export default LotteryRulesSection;
