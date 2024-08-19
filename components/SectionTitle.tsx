'use client';
import GlobalContext from '@/context/GlobalContext';
import { useContext } from 'react';
import { SlEye } from 'react-icons/sl';

interface IProps {
  title: string;
  views?: number;
}

const SectionTitle = ({ title, views }: IProps) => {
  const { theme } = useContext(GlobalContext).themeContext;
  return (
    <div className="section-title flex flex-col gap-[18px] ">
      <h2
        className="font-aeroport font-bold transition-all dark:text-white md:text-[32px] text-[24px]"
        // style={{ fontSize: views ? '38px' : '32px' }}
      >
        {title}
      </h2>
      {views ? (
        <div className="flex gap-2 items-center">
          <SlEye
            color={theme === 'light' ? '#494949' : '#fff'}
            style={{ transition: '150ms all cubic-bezier(0.4, 0, 0.2, 1)' }}
            width={30}
            height={18}
            className="w-[30px] h-[18px]"
          />
          <span className="font-roboto text-lg font-normal text-[#494949] transition-all dark:text-white">
            {views}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default SectionTitle;
