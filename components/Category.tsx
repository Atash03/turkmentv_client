'use client';
import { useContext } from 'react';
import { ICategory } from '@/typings/category.type';
import GlobalContext from '@/context/GlobalContext';
import { usePathname } from 'next/navigation';
import MaterialsContext from '@/context/MaterialsContext';

interface IProps extends ICategory {
  isInitial?: boolean;
}

const Category = ({ id, name, isInitial }: IProps) => {
  const path = usePathname() ?? '/';
  const context = useContext(GlobalContext);
  const { params, setParams } = useContext(MaterialsContext);
  const category = params.category_id;
  const { theme } = context.themeContext;
  return (
    <li className="flex-1 max-w-[180px] cursor-pointer">
      <div
        onClick={() => {
          setParams({ ...params, category_id: String(id) });
        }}
        className="bg-categorybg rounded-five px-3 py-2 flex justify-center w-full whitespace-nowrap font-roboto transition-all text-black dark:text-white dark:bg-[#38383880]"
        style={
          category
            ? category === String(id)
              ? {
                  backgroundColor: theme === 'light' ? '#FFAB48' : '#FFFFFF',
                  color: 'black',
                }
              : {}
            : path.endsWith('/treasury') && isInitial
            ? {
                backgroundColor: theme === 'light' ? '#FFAB48' : '#FFFFFF',
                color: 'black',
              }
            : {}
        }>
        {name}
      </div>
    </li>
  );
};

export default Category;
