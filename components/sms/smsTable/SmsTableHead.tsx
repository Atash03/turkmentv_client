import React from 'react';

const SmsTableHead = () => {
  return (
    <div className="flex w-full justify-between bg-fillTableHead">
      <div className="w-[80px] px-[24px] py-[20px]">
        <span className="text-black font-[600] leading-[125%] text-[16px]">ID</span>
      </div>
      <div className="w-[200px] px-[24px] py-[20px]">
        <span className="text-black font-[600] leading-[125%] text-[16px]">Telefon belgi</span>
      </div>
      <div className="w-[380px] px-[24px] py-[20px]">
        <span className="text-black font-[600] leading-[125%] text-[16px]">SMS</span>
      </div>
      <div className="w-[180px] px-[24px] py-[20px]">
        <span className="text-black font-[600] leading-[125%] text-[16px]">Wagty</span>
      </div>
    </div>
  );
};

export default SmsTableHead;
