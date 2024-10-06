'use client';
import PrizeCard from '@/components/prizes/PrizeCard';
import { useRouter } from 'next/router';

const page = ({ params }: { params: { user_id: string } }) => {
  return (
    <div className="flex flex-col gap-[64px] items-center">
      <header className="flex flex-col gap-[24px]">
        <div className="flex flex-col gap-[8px] max-w-[639px] w-full">
          <h1 className="text-lightOnSurface text-display1 leading-display1 tracking-[-1%] text-center font-medium">
            Список подарков
          </h1>
          <p className="text-center text-textBase leading-textBase tracking-[-1%] text-lightOnSurface">
            Поздравляю с победой в викторине! Вы стали победителем и получаете возможность выбрать
            подарок по своему выбору. Пожалуйста, ознакомьтесь с доступными вариантами подарков и
            сообщите нам ваше предпочтение. С нетерпением ждем вашего выбора, чтобы доставить вам
            заслуженный приз!
          </p>
        </div>
        <p className="text-center text-textSmall leading-texttext-textSmall tracking-[-1%] text-lightOnSurface">
          Есть вопросы? Обратись XYXYXY!
        </p>
      </header>
      <div className="flex flex-col gap-[16px] items-center max-w-[832px]">
        {[
          new Array(3)
            .fill(' ')
            .map((_, i) => <PrizeCard variant={i > 0 ? 'disabled' : 'selected'} key={i} />),
        ]}
      </div>
    </div>
  );
};

export default page;
