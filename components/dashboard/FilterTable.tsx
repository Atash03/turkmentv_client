'use client';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { MouseEvent, useContext, useEffect, useRef, useState } from 'react';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { SmsContext } from '@/context/SmsContext';
import Image from 'next/image';
import { useOnClickOutside } from 'usehooks-ts';
import { SlSocialGithub } from 'react-icons/sl';

export const sortData = [
  {
    title: 'Newest',
    id: 'desc',
  },
  {
    title: 'Oldest',
    id: 'asc',
  },
];

const FilterTable = () => {
  const smsContext = useContext(SmsContext);
  if (!smsContext) {
    throw new Error('smsContext must be used within an AuthProvider');
  }

  const {
    datee,
    setDatee,
    setActiveSort,
    activeSort,
    searchValue,
    setSearchValue,
    setSearchFecth,
    searchFecth,
    timeDate,
    setTimeDate,
    smsTableData,
  } = smsContext;

  const calendarRef = useRef<HTMLDivElement>(null);

  const [calendar, setCalendar] = useState(false);

  const [filterActive, setFilterActive] = useState(false);

  const handleClickOutside = () => {
    setCalendar(false);
  };

  useOnClickOutside(calendarRef, handleClickOutside);

  const checkSortActive = () => {
    if (activeSort === 'asc' || datee || searchFecth) {
      setFilterActive(true);
    } else {
      setFilterActive(false);
    }
  };

  const resetFilters = () => {
    setActiveSort('desc');
    setDatee(undefined);
    setSearchFecth('');
    setSearchValue('');
  };
  const resetSearch = () => {
    setSearchFecth('');
    setSearchValue('');
  };

  useEffect(() => {
    checkSortActive();
  }, [activeSort, datee, searchFecth]);

  return (
    <div className="">
      <div className="flex gap-6 w-full justify-between items-start">
        <div className="flex flex-col gap-[16px]">
          <div className="bg-[#F0F0FA] rounded-full flex  gap-6 shadow-tableShadow">
            <div className="flex items-center pr-[24px] w-fit gap-[24px]">
              <div
                className={clsx(
                  'leading-[115%] text-[14px] py-[16px] px-[24px] bg-[#E1E1F5] text-black font-semibold rounded-l-full',
                  {},
                )}>
                Filtr
              </div>
              {sortData.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setActiveSort(item.id);
                  }}
                  className={clsx('leading-[115%] text-[14px] cursor-pointer', {
                    'text-fillButtonAccentDefault font-[600]': activeSort === item.id,
                    'text-textDarkt': activeSort !== item.id,
                  })}>
                  {item.title}
                </div>
              ))}

              <div className="relative">
                <div
                  onClick={() => setCalendar((prev) => !prev)}
                  className={clsx(
                    'leading-[115%]  text-[14px] text-textDarkt cursor-pointer w-fit ',
                    {},
                  )}>
                  Kalendar
                </div>
                <AnimatePresence>
                  {calendar && (
                    <motion.div
                      initial={{ opacity: 0, y: -20, pointerEvents: 'none' }}
                      animate={{ opacity: 1, y: 0, pointerEvents: 'all' }}
                      exit={{ opacity: 0, y: -20, pointerEvents: 'none' }}
                      transition={{ ease: 'easeInOut' }}
                      ref={calendarRef}
                      className="absolute top-5">
                      <Calendar
                        mode="single"
                        selected={datee}
                        onSelect={setDatee}
                        initialFocus
                        onDayClick={() => setCalendar(false)}
                        className={clsx(
                          'my-20 bg-[#F5F5FA] w-fit rounded-[8px] -translate-y-[50px] -translate-x-[60px] shadow-[0_2px_32px_rgba(0,0,0,0.3)] transition-all',
                        )}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          {datee && smsTableData?.data.length !== 0 && (
            <input
              type="text"
              placeholder="Sagat boýunça gözle... 18:1"
              onChange={(e) => setTimeDate(e.target.value)}
              value={timeDate}
              className="w-full outline-none px-6 py-3 shadow-tableShadow bg-[#F0F0FA] rounded-full"
            />
          )}

          {filterActive ? (
            <div
              className="cursor-pointer h-fit flex items-center gap-[8px] stroke-textGray hover:stroke-fillNavyBlue text-textDarkt hover:text-fillNavyBlue"
              onClick={resetFilters}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-all ease-out duration-[0.3s]">
                <path
                  d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                  stroke="current"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                )
              </svg>
              <h1 className=" text-[14px] font-medium w-fit">Filteri aýyr</h1>
            </div>
          ) : null}
        </div>

        <div className="flex shadow-tableShadow rounded-full w-fit">
          <div className="flex items-center justify-between bg-[#F0F0FA] w-fit py-3 px-4 rounded-[9999px_0_0_9999px] ">
            <input
              type="text"
              placeholder="Gözle..."
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              className="w-full bg-transparent outline-none"
            />
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer stroke-textGray hover:stroke-fillNavyBlue transition-all ease-out duration-[0.3s]"
              onClick={resetSearch}>
              {searchFecth ? (
                <path
                  d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                  stroke="current"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              ) : null}
            </svg>
          </div>
          <div
            onClick={() => setSearchFecth(searchValue)}
            className="bg-fillButtonAccentDefault rounded-[0_9999px_9999px_0] px-4 py-[12px] cursor-pointer">
            <Image src={'/search.svg'} alt="search" width={24} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterTable;
