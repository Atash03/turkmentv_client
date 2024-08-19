'use client';

import GlobalContext from '@/context/GlobalContext';
import { useContext } from 'react';
import { RiContrastLine } from 'react-icons/ri';

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(GlobalContext).themeContext;
  return (
    <div className="theme-switch flex items-center gap-2">
      <span
        className="font-roboto font-normal text-lg transition-all text-[#D9D9D9] cursor-pointer"
        onClick={() => setTheme('light')}
        style={{ color: theme === 'light' ? '#121268' : '#D9D9D9' }}>
        Light
      </span>
      <RiContrastLine
        color={theme === 'dark' ? '#37ABE1' : '#121268'}
        width={23}
        height={23}
        className="rotate-180 w-[23px] h-[23px] transition-all"
      />
      <span
        className="font-roboto font-normal text-lg transition-all text-[#D9D9D9] cursor-pointer"
        onClick={() => setTheme('dark')}
        style={{ color: theme === 'dark' ? '#37ABE1' : '#D9D9D9' }}>
        Dark
      </span>
    </div>
  );
};

export default ThemeSwitch;
