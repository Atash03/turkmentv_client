'use client';
import { Queries } from '@/api/queries';
import { MessagesByTvAdmin } from '@/models/sms/messagesByTvAdmis.model';
import { IMyTvAdmins } from '@/models/sms/my.tv.admins.model';
import { format } from 'date-fns';
import { Dispatch, FC, ReactNode, SetStateAction, createContext, useEffect, useState } from 'react';

interface ISmsContext {
  activeNumber: number | undefined;
  setActiveNumber: Dispatch<SetStateAction<number | undefined>>;
  tableIsLoading: boolean | undefined;
  setTableIsLoading: Dispatch<SetStateAction<boolean | undefined>>;

  smsData: IMyTvAdmins | undefined;
  setSmsData: Dispatch<SetStateAction<IMyTvAdmins | undefined>>;
  smsTableData: MessagesByTvAdmin | undefined;
  setSmsTableData: Dispatch<SetStateAction<MessagesByTvAdmin | undefined>>;

  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;

  // getAdmins: () => void;
  // getMessages: (smsData: IMyTvAdmins, currentPage: number) => void;

  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;

  activeSort: string;
  setActiveSort: (value: string) => void;

  searchValue: string;
  setSearchValue: (value: string) => void;

  searchFecth: string;
  setSearchFecth: (value: string) => void;

  datee: any;
  setDatee: (value: any) => void;
  formatedDate: any;
  dateValue: string;

  timeDate: string;
  setTimeDate: (value: string) => void;
}

interface SmsProviderProps {
  children: ReactNode;
}

const SmsContext = createContext<ISmsContext | undefined>(undefined);

export const SmsProvider: FC<SmsProviderProps> = ({ children }) => {
  const [activeSort, setActiveSort] = useState('desc');
  const [activeNumber, setActiveNumber] = useState<number | undefined>();
  const [tableIsLoading, setTableIsLoading] = useState<boolean | undefined>(true);
  const [smsData, setSmsData] = useState<IMyTvAdmins | undefined>(undefined);
  const [smsTableData, setSmsTableData] = useState<MessagesByTvAdmin | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isError, setIsError] = useState<boolean>(false);
  const [datee, setDatee] = useState<Date>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchFecth, setSearchFecth] = useState<string>('');
  const [timeDate, setTimeDate] = useState<string>('');

  const formatedDate = datee && format(datee, 'P').split('/').reverse();

  const dateValue = formatedDate ? `${formatedDate[0]}-${formatedDate[2]}-${formatedDate[1]}` : '';

  // if (token) {
  //   useEffect(() => {
  //     console.log('first');
  //     getAdmins();
  //   }, [token]);
  // }

  // useEffect(() => {
  //   if (smsData) {
  //     setTableIsLoading(true);
  //     getMessages();
  //   }
  // }, [currentPage, activeNumber]);

  // const getAdmins = () => {
  //   try {
  //     Queries.getAdmins().then((res) => {
  //       setSmsData(res);
  //       setActiveNumber(res.data[0].id);
  //       if (!res.data) {
  //         setIsError(true);
  //       }
  //     });
  //   } catch (error) {
  //     setIsError(true);
  //   }
  // };

  // const getMessages = (smsData: IMyTvAdmins, currentPage: number) => {
  //   try {
  //     Queries.getMessages(smsData.data[0].id, currentPage, dateValue, activeSort, searchFecth).then(
  //       (res) => {
  //         setSmsTableData(res);
  //         setTableIsLoading(false);

  //         if (!res.data) {
  //           setIsError(true);
  //         }
  //       },
  //     );
  //   } catch (error) {
  //     setIsError(true);
  //   }
  // };

  return (
    <SmsContext.Provider
      value={{
        activeNumber,
        tableIsLoading,
        setTableIsLoading,
        smsData,
        setSmsData,
        setActiveNumber,
        smsTableData,
        setSmsTableData,
        setCurrentPage,
        // getMessages,
        currentPage,
        isError,
        setIsError,
        activeSort,
        setActiveSort,
        datee,
        setDatee,
        formatedDate,
        dateValue,
        searchValue,
        setSearchValue,
        searchFecth,
        setSearchFecth,
        timeDate,
        setTimeDate,
      }}>
      {children}
    </SmsContext.Provider>
  );
};

export { SmsContext };
