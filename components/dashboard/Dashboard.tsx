'use client';

import { useContext, useEffect, useState } from 'react';
import { FitlerNumber } from '@/components/table/FitlerNumber';
import { Search } from '@/components/table/Search';
import { Sort } from '@/components/table/Sort';
import { Inter } from 'next/font/google';
import { AuthContext } from '@/context/AuthContext';
import ProtectedRoute from '@/components/sms/ProtectedRoute';
import { setDate } from 'date-fns';
import { Calendar } from 'lucide-react';
import { SmsContext } from '@/context/SmsContext';
import SmsTable from '@/components/sms/smsTable/SmsTable';
import Loader from '@/components/Loader';
import GradientTitle from '@/components/vote/GradientTitle';
import FilterTable from './FilterTable';
// import FilterTable from './FilterTable';

const inter = Inter({
  weight: ['400', '600', '700', '500'],
  subsets: ['cyrillic', 'latin'],
});

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { logout, userIsLoading } = authContext;

  const smsContext = useContext(SmsContext);
  if (!smsContext) {
    throw new Error('smsContext must be used within an AuthProvider');
  }
  const { setCurrentPage, isError, smsTableData, currentPage } = smsContext;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [smsTableData, currentPage]);

  if (isError) {
    return (
      <main>
        <div className="container flex flex-col justify-center items-center h-screen">
          <h1
            className={`text-[44px] sm:text-[80px] leading-[100%] font-bold bg-fancyTitle bg-clip-text text-transparent text-center `}>
            Gysga belgi birikdirilmedi
          </h1>
          <button
            onClick={() => {
              logout();
              setCurrentPage(1);
            }}
            type="submit"
            className="p-3 bg-[#7A7ACC] text-[18px] leading-[150%] font-medium text-white w-[200px] rounded-xl mt-[30px]">
            Yza
          </button>
        </div>
      </main>
    );
  }

  if (userIsLoading) {
    return (
      <main>
        <div className="container flex justify-center items-center h-screen">
          <Loader />
        </div>
      </main>
    );
  }

  return (
    <ProtectedRoute>
      <div className={`pt-[100px] pb-[200px] ${inter.className}`}>
        <div className="container">
          <div className="flex gap-[40px]">
            <div className="flex flex-col gap-[32px]">
              <FitlerNumber />
              <span
                onClick={() => {
                  logout();
                  setCurrentPage(1);
                }}
                className="text-textLight text-[16px] leading-[140%] font-semibold cursor-pointer w-full py-2">
                Ulgamdan çykmak
              </span>
            </div>

            <div className="flex flex-col w-full gap-5">
              <FilterTable />
              <SmsTable />
            </div>
            {/* <div className="flex flex-col gap-5 w-full">
              <div className="flex gap-8 items-end justify-end w-full">
                <Sort />
                <Search />
              </div>
              <Calendar
                mode="single"
                // selected={date}
                // onSelect={setDate}
                className="rounded-md border"
              />
            </div> */}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
