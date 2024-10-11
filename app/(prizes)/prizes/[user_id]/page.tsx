'use client';
import PrizeCard from '@/components/prizes/PrizeCard';
import { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GiftsType } from '@/typings/gifts/gifts.type';
import { useRouter } from 'next/navigation';

// Define the expected shape of the fetched data
interface Prize {
  id: number;
  name: string;
  description: string;
}

const PrizesPage = ({ params }: { params: { user_id: string } }) => {
  const [selectedPrize, setSelectedPrize] = useState<null | number>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  // Fetching data using TanStack Query
  const { data, isLoading, error } = useQuery<GiftsType, Error>(
    [`gifts-${params.user_id}`, params.user_id, selectedPrize], // Query key using user_id
    () =>
      axios
        .get(`https://sms.turkmentv.gov.tm/api/gifts/${params.user_id}`)
        .then((response) => response.data),
    {
      staleTime: 60000, // Cache data for 1 minute
      // Handle error with onError callback to trigger the redirect
      onError: () => {
        router.push('/prizes/auth');
      },
    },
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full text-heading2 leading-heading2 font-medium min-h-[50vh]">
        Loading...
      </div>
    );

  // Log the error to the console, even if redirecting
  if (error) {
    console.error('Error loading prizes:', error.message);
    return null; // Return null since the redirect will occur
  }

  return (
    <div className="flex flex-col gap-[32px] md:gap-[64px] items-center">
      <header className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] max-w-[639px] w-full">
          <h1 className="text-lightOnSurface text-heading1 leading-heading1 md:text-display1 md:leading-display1 tracking-[-1%] text-center font-medium">
            {data.data.title}
          </h1>
          <p className="text-center text-textSmall leading-textSmall md:text-textBase md:leading-textBase tracking-[-1%] text-lightOnSurface">
            Поздравляю с победой в викторине! Вы стали победителем и получаете возможность выбрать
            подарок по своему выбору. Пожалуйста, ознакомьтесь с доступными вариантами подарков и
            сообщите нам ваше предпочтение. С нетерпением ждем вашего выбора, чтобы доставить вам
            заслуженный приз!
          </p>
        </div>
        <p className="text-center text-textXSmall leading-textXSmall md:text-textSmall md:leading-textSmall tracking-[0.4px] md:-tracking-[1%] text-lightOnSurface">
          Есть вопросы? Обратись XYXYXY!
        </p>
      </header>
      <div className="flex flex-col gap-[24px] md:gap-[16px] items-center max-w-[832px] w-full">
        {data.data.gifts &&
          data.data.gifts.map((prize, i) => (
            <PrizeCard
              key={prize.id}
              variant={
                selectedPrize === null
                  ? 'default'
                  : selectedPrize === prize.id
                  ? 'selected'
                  : 'disabled'
              }
              setSelectedPrize={setSelectedPrize}
              id={prize.id}
              code={params.user_id}
              {...prize}
            />
          ))}
      </div>
    </div>
  );
};

export default PrizesPage;
