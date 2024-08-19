'use client';

import { Calendar } from '@/components/ui/calendar';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';

const page = () => {
  const [date, setDate] = useState<Date>();

  const calendarRef = useRef<HTMLDivElement | null>(null);

  const mount = useRef(false);

  useEffect(() => {
    if (mount.current) {
      if (calendarRef.current) {
        const calendarFooter = document.createElement('div');
        calendarFooter.classList.add(
          'calendar-footer',
          'flex',
          'justify-between',
          'items-center',
          'mt-6',
          'px-3',
        );

        const calendar = document.querySelector('.calendar');

        const btn1 = document.createElement('div');
        btn1.classList.add('btn1', 'text-textLight', 'cursor-pointer', 'text-[14px]');
        btn1.textContent = 'Отменить';

        const btn2 = document.createElement('button');
        btn2.classList.add('btn2');
        btn2.textContent = 'Выбрать';

        calendarFooter.appendChild(btn1);
        calendarFooter.appendChild(btn2);
        calendar?.appendChild(calendarFooter);
      }
    }
    mount.current = true;
  }, []);

  return (
    <section className="container">
      <div className="" ref={calendarRef}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          // onDayClick={() => setActiveDay(true)}
          className={clsx(
            'my-20 calendar bg-white w-fit rounded-[8px] shadow-[0_2px_32px_rgba(0,0,0,0.3)] transition-all',
            // { 'day-styles': activeDay },
          )}
        />
      </div>
    </section>
  );
};

export default page;
