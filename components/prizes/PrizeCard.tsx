import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from 'react-day-picker';
import { Dispatch, SetStateAction } from 'react';
import { ClassNames } from '@emotion/react';

interface IProps {
  variant: 'default' | 'selected' | 'disabled';
  prizeId: number;
  setSelectedPrize: Dispatch<SetStateAction<null | number>>;
  className?: string;
}

const PrizeCard = ({ variant, prizeId, setSelectedPrize, className }: IProps) => {
  return (
    <div
      className={cn(
        'bg-lightSurfaceContainerHigher flex md:flex-row flex-col rounded-[12px] overflow-hidden',
        className,
        {
          'opacity-50': variant === 'disabled',
        },
      )}>
      <div className="flex-1 overflow-hidden md:h-full h-[186px]">
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
          <Dialog>
            <DialogTrigger className="px-[24px] py-[10px] w-full md:w-fit text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]">
              Выбрать
            </DialogTrigger>
            <DialogContent className="bg-lightSurfaceContainer flex flex-col gap-[8px]">
              <DialogHeader className="flex flex-col gap-[8px]">
                <DialogTitle>Успешно!</DialogTitle>
                <DialogDescription>Все прошло успешно!</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button
                    className="px-[24px] py-[10px]  w-full text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]"
                    onClick={() => setSelectedPrize(prizeId)}>
                    Закрыть
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
