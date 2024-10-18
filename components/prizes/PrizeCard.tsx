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
  const [dialogTitle, setDialogTitle] = useState<string>('Выберите приз');
  const [dialogDescription, setDialogDescription] = useState<string>('Загрузка...');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // TanStack Query mutation for the API request
  const choosePrizeMutation = useMutation({
    mutationFn: () =>
      axios.post(`https://sms.turkmentv.gov.tm/api/gifts/${id}/choose`, {
        code,
      }),
    onSuccess: () => {
      setDialogTitle('Успешно');
      setDialogDescription('Приз успешно выбран.');
      setIsSuccess(true); // Mark as success so we can handle setting the prize when dialog closes
    },
    onError: () => {
      setDialogTitle('Ошибка');
      setDialogDescription('Произошла ошибка, попробуйте еще раз.');
      setIsSuccess(false); // Reset on error
    },
  });

  const handleDialogOpen = () => {
    // Reset the dialog to show the loading state
    setDialogTitle('Загрузка...');
    setDialogDescription('Пожалуйста подождите');
    setIsSuccess(false); // Reset success state before opening

    // Trigger the mutation when the dialog opens
    choosePrizeMutation.mutate();
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);

    // Check if the dialog was closed and if the mutation was successful
    if (!open && isSuccess) {
      setSelectedPrize(id); // Set the selected prize when the dialog closes after success
    }
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
          src={image ? image : '/gift-placeholder.png'}
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
          <>
            {/* DialogTrigger to open the dialog */}
            <div>
              <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
                <DialogTrigger asChild>
                  <button
                    className="px-[24px] py-[10px] w-full md:w-fit text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]"
                    onClick={handleDialogOpen}
                    disabled={choosePrizeMutation.isLoading}>
                    {choosePrizeMutation.isLoading ? 'Loading...' : 'Saýla'}
                  </button>
                </DialogTrigger>

                {/* DialogContent that shows loading or response */}
                <DialogContent className="bg-lightSurfaceContainer flex flex-col gap-[8px]">
                  <DialogHeader className="flex flex-col gap-[8px]">
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogDescription>{dialogDescription}</DialogDescription>
                  </DialogHeader>
                  {dialogTitle !== 'Загрузка...' && (
                    <DialogFooter>
                      <DialogClose asChild>
                        <button className="px-[24px] py-[10px] w-full text-textSmall leading-textSmall -tracking-[-1%] font-medium bg-lightPrimary text-lightOnPrimary rounded-[40px]">
                          Ýapmak
                        </button>
                      </DialogClose>
                    </DialogFooter>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </>
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
