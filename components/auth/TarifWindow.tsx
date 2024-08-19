'use client';
import Button from '../Button';

interface Props {
  folder: number;
  days: number;
  price: number;
}

const TarifWindow = ({ folder, days, price }: Props) => {
  return (
    <div className="min-w-[394px] pb-[16px] pt-[56px] px-[16px] flex flex-col items-center bg-white text-black gap-[62px] rounded-2xl">
      <div className="flex items-center flex-col gap-[32px] pb-[22px] border-b border-b-[#CAD2DA]">
        <h3 className="text-3xl">{`BUKJA ${folder}`}</h3>
        <h2 className="text-[#FFAB48] font-bold text-4xl">{`${days} GÜN - ${price} TMT`}</h2>
      </div>
      <Button name="Satyn al" type="button" onClick={() => null} width="100%" />
    </div>
  );
};

export default TarifWindow;
