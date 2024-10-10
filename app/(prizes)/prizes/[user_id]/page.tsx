'use client';
import PrizeCard from '@/components/prizes/PrizeCard';
import { useState } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Define the expected shape of the fetched data
interface Prize {
  id: number;
  name: string;
  description: string;
}

const PrizesPage = ({ params }: { params: { user_id: string } }) => {
  const [selectedPrize, setSelectedPrize] = useState<null | number>(null);
  const queryClient = useQueryClient();

  // Fetching data using TanStack Query
  const { data, isLoading, error } = useQuery<Prize[], Error>(
    [`gifts-${params.user_id}`, params.user_id], // Query key using user_id
    () =>
      axios
        .get(`https://sms.turkmentv.gov.tm/api/gifts/${params.user_id}`)
        .then((response) => response.data),
    {
      staleTime: 60000, // Cache data for 1 minute
      initialData: () => queryClient.getQueryData([`gifts-${params.user_id}`]),
    },
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading prizes: {error.message}</p>;

  return (
    <div className="flex flex-col gap-[32px] md:gap-[64px] items-center">
      <header className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] max-w-[639px] w-full">
          <h1 className="text-lightOnSurface text-heading1 leading-heading1 md:text-display1 md:leading-display1 tracking-[-1%] text-center font-medium">
            Список подарков
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
      <div className="flex flex-col gap-[24px] md:gap-[16px] items-center max-w-[832px]">
        {data.length > 0 &&
          data.map((prize, i) => (
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
              prizeId={prize.id}
            />
          ))}
      </div>
    </div>
  );
};

export default PrizesPage;
