import LotteryWinner from './LotteryWinner';

const LotteryWinnersList = ({ winners }: { winners: number[] }) => {
  return (
    <div className="flex flex-col w-full p-8 gap-4">
      <div className="flex flex-col gap-2 pb-4 border-b border-lightOutlineVariant">
        <h4 className="font-heading-3-regular">Results</h4>
        <p className="font-base-medium">The results after each stage will be shown here.</p>
      </div>

      {winners.map((_, index) => (
        <LotteryWinner number="8 XX XX-XX-XX" index={index} />
      ))}
    </div>
  );
};

export default LotteryWinnersList;
