'use client';
import Image from 'next/image';
import { FiMoreHorizontal } from 'react-icons/fi';

interface IProps {
  onClick: () => void;
  disabled?: boolean;
  isFetching?: boolean;
}
const MoreBtn = ({ onClick, disabled, isFetching }: IProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button"
      className="flex gap-2 rounded-five py-2 px-2 w-[180px] bg-mlightblue items-center justify-center">
      {isFetching ? (
        <Image src="/spin.svg" alt="spin" width={38} height={38} unoptimized />
      ) : (
        <>
          <FiMoreHorizontal color="white" width={14} height={7} />
          <span className="font-roboto text-lg font-bold text-white">Ýene gör</span>
        </>
      )}
    </button>
  );
};

export default MoreBtn;
