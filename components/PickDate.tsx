'use client';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const PickDate = () => {
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs('2022-05-16'));
  return (
    <div className="date-picker max-w-[500px] w-full bg-fancy-input font-roboto text-lg font-normal">
      <DatePicker
        value={date}
        onChange={(newValue) => (newValue ? setDate(newValue) : null)}
        format="MMM DD, YYYY"
        className="w-full bg-transparent"
      />
    </div>
  );
};

export default PickDate;
