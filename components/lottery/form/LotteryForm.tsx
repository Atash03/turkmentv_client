import React, { useState } from 'react';

const LotteryForm = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="p-6 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="font-base-medium">Siziň kodyňyz</span>
        <div className="flex flex-col w-full gap-1">
          <input
            type="text"
            className="p-4 rounded-xl bg-lightSurfaceContainerHigher font-base-regular text-lightOnSurfaceVariant placeholder:text-lightOnSurfaceVariant"
            placeholder="123456"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="font-xsmall-regular">Öz kodyňyzy giriziň</span>
        </div>
      </div>

      <button className="p-[10px] w-full flex items-center justify-center text-lightPrimary md:font-small-medium text-[14px] leading-[20px] rounded-full outline-none border border-lightOutline hover:bg-[#57599214] transition-all ease-in-out duration-300">
        Tassyklamak
      </button>
    </div>
  );
};

export default LotteryForm;
