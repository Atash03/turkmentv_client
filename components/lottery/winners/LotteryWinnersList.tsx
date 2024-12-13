import LotteryWinner from './LotteryWinner';

const LotteryWinnersList = ({ winners }: { winners: number[] }) => {
  return (
    <div className="w-full md:p-8 p-6">
      <div className="flex flex-col w-full gap-4 md:max-h-[548px] sm:max-h-[276px] max-h-[438px] h-full overflow-y-scroll pr-2">
        <div className="flex flex-col gap-2 md:pb-4 pb-3 border-b border-lightOutlineVariant">
          <h4 className="font-heading-3-regular">Results</h4>
          <p className="font-base-medium">The results after each stage will be shown here.</p>
        </div>

        <div className="flex flex-col w-full gap-4">
          {winners.map((_, index) => (
            <LotteryWinner number="8 XX XX-XX-XX" index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LotteryWinnersList;
