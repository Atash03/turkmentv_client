'use client';

import StepsContext from '@/context/StepsContext';
import { useContext } from 'react';

interface IOption {
  title: string;
  description?: string | null;
  id: number;
  activeId: number | null;
  onClick: (id: number) => void;
}

const Option = ({ title, description, id, onClick, activeId }: IOption) => {
  console.log(title);
  return (
    <div
      onClick={() => onClick(id)}
      style={id === activeId ? { background: '#121268', color: 'white' } : {}}
      className="cursor-pointer overflow-hidden font-roboto leading-[22px] flex flex-col justify-center items-center gap-[12px] max-w-[400px] bg-[#E7E7E7] border-[1px] border-[#BBBBBB] rounded-[5px] px-[12px] py-[24px] hover:border-[#37ABE1] transition-all">
      <h2
        className="md:min-h-[68px] font-bold text-[22px] md:pb-[22px] pb-4 border-b-[#BBBBBB] border-b-[1px]"
        style={
          !description
            ? {
                border: 'none',
                paddingBottom: 0,
                padding: '34px 0',
                minHeight: 'unset',
                textAlign: 'center',
              }
            : {}
        }>
        {title}
      </h2>
      <p
        className="text-[18px] w-full"
        style={!description ? { display: 'none' } : {}}
        dangerouslySetInnerHTML={{ __html: description || '' }}></p>
    </div>
  );
};

export default Option;
