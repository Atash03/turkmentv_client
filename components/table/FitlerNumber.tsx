'use client';

import { Queries } from '@/api/queries';
import Loader from '../Loader';
import axios, { AxiosError, AxiosPromise } from 'axios';
import baseUrl from '@/baseUrl';
import routes from '@/routes';
import { useContext, useEffect, useState } from 'react';
import { IMyTvAdmins } from '@/models/sms/my.tv.admins.model';
import { AuthContext } from '@/context/AuthContext';
import { SmsContext } from '@/context/SmsContext';
import clsx from 'clsx';

const numbers = [
  {
    number: '0801',
  },
  {
    number: '0802',
  },
  {
    number: '0803',
  },
  {
    number: '0804',
  },
  {
    number: '0805',
  },
  {
    number: '0806',
  },
];

export const FitlerNumber = () => {
  const smsContext = useContext(SmsContext);
  if (!smsContext) {
    throw new Error('smsContext must be used within an AuthProvider');
  }
  const { activeNumber, setActiveNumber, smsData, tableIsLoading, setSmsData, setIsError } =
    smsContext;

  const getAdmins = () => {
    try {
      Queries.getAdmins().then((res) => {
        setSmsData(res);
        setActiveNumber(res.data[0].id);
        if (!res.data) {
          setIsError(true);
        }
      });
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  if (!smsData) {
    return (
      <div className="w-[314px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#F0F0FA] rounded-3xl w-[314px] shadow-tableShadow">
      <div className="font-semibold leading-[125%] bg-[#E1E1F5] rounded-[25px_25px_0_0] py-6 px-5">
        Gysga belgi boýunça filtr
      </div>

      <div className="flex flex-col w-full">
        {smsData?.data.map((item) => (
          <div
            key={item.id}
            className={clsx(
              `h-[60px] px-6 py-5 font-semibold cursor-pointer hover:text-fillButtonAccentDefault transition-all duration-75`,
              {
                'text-fillButtonAccentDefault': item.id === activeNumber,
              },
            )}
            onClick={() => setActiveNumber(item.id)}>
            {item.login}
          </div>
        ))}
      </div>
    </div>
  );
};
