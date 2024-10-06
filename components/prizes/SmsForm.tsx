'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const SmsForm = () => {
  const [inputValue, setInputValue] = useState('');
  return (
    <form className="bg-lightSurface rounded-[24px] p-[40px] w-fit flex flex-col gap-[24px] shadow-lightBoxShadow1">
      <h1 className="text-display3 font-[500] leading-display3 ">Вход в «подарошную»</h1>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-textBasebase font-medium leading-textBase">Промокод</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
          placeholder="Введите свой промокод"
        />
      </div>
      <Link href={`${inputValue}`} className="">
        <button className="cursor-pointer text-textLarge leading-textLarge py-[12px] w-full flex justify-center items-center rounded-[12px] bg-lightPrimary font-medium text-lightOnPrimary">
          Войти
        </button>
      </Link>
    </form>
  );
};

export default SmsForm;
