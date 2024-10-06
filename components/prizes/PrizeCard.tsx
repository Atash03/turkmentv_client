import { cn } from '@/lib/utils';
import Image from 'next/image';

interface IProps {
  variant: 'default' | 'selected' | 'disabled';
}

const PrizeCard = ({ variant }: IProps) => {
  return (
    <div
      className={cn('bg-lightSurfaceContainerHigher flex rounded-[12px] overflow-hidden', {
        'opacity-50': variant === 'disabled',
      })}>
      <div className="flex-1  overflow-hidden">
        <Image width={416} height={248} src="/prize.jpg" alt="prize" className="h-full w-full" />
      </div>
      <div className="flex-1 p-[16px] flex flex-col gap-[16px]">
        <h2 className="text-heading5 leading-heading5 -tracking-[-1%] font-medium text-lightOnSurface">
          Новый Cadillac Escalade 2025 Premium Luxury Platinun
        </h2>
        <p className="text-textSmall leading-textSmall -tracking-[-1%] text-lightOnSurfaceVariant">
          Это роскошный полноразмерный SUV, представленный американским производителем Cadillac.
          Этот автомобиль отличается высоким уровнем комфорта, стиля и технологий.{' '}
        </p>
        {variant === 'default' ? (
          <button className="px-[24px] py-[10px] w-fit text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]">
            Выбрать
          </button>
        ) : variant === 'disabled' ? (
          <button
            disabled
            className="px-[24px] py-[10px] w-fit text-textSmall leading-textSmall opacity-[0.12] -tracking-[-1%] font-medium bg-lightOnSurfaceDisabled text-lightOnSurface rounded-[40px]">
            Недоступно
          </button>
        ) : variant === 'selected' ? (
          <button
            disabled
            className="px-[24px] py-[10px] w-fit text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightOnSurfaceDisabled text-lightOnSurface rounded-[40px]">
            Выбрано
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PrizeCard;
