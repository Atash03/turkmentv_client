'use client';
import React, { useContext, useEffect, useState } from 'react';
import SmsTableRow from './SmsTableRow';

import { SmsContext } from '@/context/SmsContext';

const SmsTableBody = () => {
  const smsContext = useContext(SmsContext);
  if (!smsContext) {
    throw new Error('smsContext must be used within an AuthProvider');
  }
  const { smsTableData, currentPage, timeDate } = smsContext;

  console.log(smsTableData?.data[0].dt.slice(11, 15));

  return (
    <div className="flex flex-col w-full gap-[24px]">
      <div className="flex flex-col w-full rounded-b-[25px] ">
        {smsTableData?.data
          .filter((item) => (timeDate ? item.dt.slice(11, 15).includes(timeDate) : item))
          .map((row, index) => (
            <SmsTableRow
              index={currentPage !== 1 ? 30 * (currentPage - 1) + index + 1 : index + 1}
              key={row.id}
              sms={row.msg}
              date={row.dt}
              number={row.client}
            />
          ))}
      </div>
    </div>
  );
};

export default SmsTableBody;
