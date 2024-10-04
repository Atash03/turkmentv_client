import React from 'react';

const SmsForm = () => {
  return (
    <form className="bg-lightSurface rounded-[24px] p-[40px] w-fit flex flex-col gap-[24px] shadow-lightBoxShadow1">
      <h1 className="text-display3 font-[500] leading-display3 ">Вход в «подарошную»</h1>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-textBasebase font-medium leading-textBase">Промокод</h2>
        <input
          type="text"
          className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
          placeholder="Введите свой промокод"
        />
      </div>
      <button className="cursor-pointer text-textLarge leading-textLarge py-[12px] w-full flex justify-center items-center rounded-[12px] bg-lightPrimary font-medium text-lightOnPrimary">
        Войти
      </button>
    </form>
  );
};

export default SmsForm;
