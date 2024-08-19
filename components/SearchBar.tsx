'use client';

import { FormEvent, useContext, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import GlobalContext from '@/context/GlobalContext';
import MaterialsContext from '@/context/MaterialsContext';

const SearchBar = () => {
  const { theme } = useContext(GlobalContext).themeContext;
  const { params, setParams } = useContext(MaterialsContext);

  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <form
      className=" border-2 border-[rgba(139, 218, 255, 0.24)] grid grid-cols-search"
      style={{
        background:
          'linear-gradient(90.91deg, rgba(55, 171, 225, 0.07) 16.09%, rgba(55, 171, 225, 0.19) 115.87%)',
      }}
      onSubmit={(e: FormEvent) => e.preventDefault()}>
      <div>
        <input
          value={searchValue}
          onChange={(e) => {
            setParams({ ...params, search: searchValue || '' });
            setSearchValue(e.target.value);
          }}
          type="text"
          className="font-roboto py-[10px] px-5 text-[#373737] text-lg border-r border-white w-full h-full bg-transparent outline-none transition-all dark:text-white"
          placeholder="Gözlemek"
        />
      </div>
      <button
        className="flex items-center justify-center px-4 py-2"
        onClick={() => {
          setParams({ ...params, search: searchValue || '' });
        }}>
        <FiSearch
          height={20}
          width={20}
          color={theme === 'light' ? '#373737' : '#fff'}
          style={{ transition: '150ms all cubic-bezier(0.4, 0, 0.2, 1)' }}
          className="block w-[22px] h-[22px]"
        />
      </button>
    </form>
  );
};

export default SearchBar;
