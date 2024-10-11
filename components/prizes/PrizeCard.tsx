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
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

interface IProps {
  variant: 'default' | 'selected' | 'disabled';
  setSelectedPrize: Dispatch<SetStateAction<null | number>>;
  className?: string;
  code: string;
  title: string;
  description: string;
  image: null | string;
  id: number;
}

const PrizeCard = ({
  variant,
  setSelectedPrize,
  code,
  id,
  title,
  description,
  image,
  className,
}: IProps) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogTitle, setDialogTitle] = useState<string>('Успешно');

  // TanStack Query mutation for the API request
  const choosePrizeMutation = useMutation({
    mutationFn: () =>
      axios.post(`https://sms.turkmentv.gov.tm/api/gifts/${id}/choose`, {
        code,
      }),
    onSuccess: () => {
      // Set the selected prize on successful API request
      setSelectedPrize(id);
      setDialogTitle('Успешно');
      setDialogOpen(true); // Open the dialog on success
    },
    onError: () => {
      // Set the dialog title to "Ошибка" on error
      setDialogTitle('Ошибка');
      setDialogOpen(true); // Open the dialog on error
    },
  });

  const handleDialogTriggerClick = () => {
    choosePrizeMutation.mutate();
  };

  return (
    <div
      className={cn(
        'bg-lightSurfaceContainerHigher flex md:flex-row flex-col rounded-[12px] overflow-hidden w-full',
        className,
        {
          'opacity-50': variant === 'disabled',
        },
      )}>
      <div className="flex-1 overflow-hidden md:h-full h-[186px]">
        <Image
          width={416}
          height={248}
          src={image ? image : '/prize.jpg'}
          alt="prize"
          className="h-full w-full"
        />
      </div>
      <div className="flex-1 p-[16px] flex flex-col gap-[16px]">
        <h2 className="text-heading5 leading-heading5 -tracking-[-1%] font-medium text-lightOnSurface">
          {title}
        </h2>
        <p className="text-textSmall leading-textSmall -tracking-[-1%] text-lightOnSurfaceVariant">
          {description}
        </p>
        {variant === 'default' ? (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              className="px-[24px] py-[10px] w-full md:w-fit text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]"
              onClick={handleDialogTriggerClick}
              disabled={choosePrizeMutation.isLoading}>
              {choosePrizeMutation.isLoading ? 'Loading...' : 'Выбрать'}
            </DialogTrigger>
            <DialogContent className="bg-lightSurfaceContainer flex flex-col gap-[8px]">
              <DialogHeader className="flex flex-col gap-[8px]">
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogDescription>Все прошло успешно!</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <button className="px-[24px] py-[10px] w-full text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]">
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
