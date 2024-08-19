'use client';
import GlobalContext from '@/context/GlobalContext';
import { ThemeService } from '@/services/theme.service';
import { ICategory, ICategoryContext } from '@/typings/category.type';
import { ITheme } from '@/typings/theme.type';
import { useState, useMemo, useEffect, ReactNode } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IBurger } from '@/typings/burger.type';
import { IAdvertisment, IAdvertismentContext } from '@/typings/advertisment.type';

interface IProps {
  children: ReactNode;
}

const MainProvider = ({ children }: IProps) => {
  const [theme, setTheme] = useState<ITheme['theme']>('light');
  const [category, setCategory] = useState<ICategory | null>({
    id: 1,
    name: '',
  });

  const [burgerOpen, setBurgerOpen] = useState<boolean>(false);

  const themeContext: ITheme = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  const categoryContext: ICategoryContext = useMemo(
    () => ({ category, setCategory }),
    [category, setCategory],
  );

  const burgerContext: IBurger = useMemo(
    () => ({ burgerOpen, setBurgerOpen }),
    [burgerOpen, setBurgerOpen],
  );

  useEffect(() => {
    setTheme(ThemeService.getLocalTheme() || 'light');
  }, []);

  // Store theme in localStorage everytime it changes
  useEffect(() => {
    ThemeService.setLocalTheme(themeContext.theme);
  }, [themeContext]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalContext.Provider value={{ themeContext, categoryContext, burgerContext }}>
          {children}
        </GlobalContext.Provider>
      </LocalizationProvider>
    </div>
  );
};

export default MainProvider;
