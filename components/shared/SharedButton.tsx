import React from 'react';

const SharedButton = ({ title }: { title: string }) => {
  return (
    <button className="py-3 px-4 bg-fillButtonAccentDefault text-center rounded-xl w-full text-[18px] text-white font-medium leading-[150%]">
      {title}
    </button>
  );
};

export default SharedButton;
