'use client';
import { useState } from 'react';

const ShopTable = () => {
  const [activePage, setActivePage] = useState<number>(1);
  return (
    <div className="flex flex-col items-end w-full gap-[20px]">
      <div className="flex flex-col items-end w-full gap-[10px]">
        <div className="table_sort flex items-center gap-[10px]">
          <h3 className=" text-textLight text-sm">Показать по:</h3>
          <span className="block text-textLight text-sm">10</span>
          <span className="block text-textLight text-sm">50</span>
          <span className="block text-textLight text-sm">100</span>
        </div>

        <div className="table_body flex flex-col w-full rounded-[25px] overflow-hidden">
          <div className="table_head flex w-full justify-between bg-fillTableHead border border-b border-fillTableStrokeTableHead">
            <span className="block text-textBlack py-[20px] px-[24px] w-[80px] text-base leading-[125%] font-semibold">
              №
            </span>
            <span className="block text-textBlack py-[20px] px-[24px] w-[200px] text-base leading-[125%] font-semibold">
              Номер телефона
            </span>
            <span className="block text-textBlack py-[20px] px-[24px] w-[230px] text-base leading-[125%] font-semibold">
              Сообщение
            </span>
            <span className="block text-textBlack py-[20px] px-[24px] w-[180px] text-base leading-[125%] font-semibold">
              Время отправки
            </span>
          </div>
          <div className="table_row_body flex flex-col w-full">
            <div className="table_row flex w-full justify-between bg-fillTableRow border border-b border-fillTableStrokeTableRow">
              <span className="block text-textDarkt py-[20px] px-[24px] w-[80px] text-base leading-[125%] font-normal">
                1
              </span>
              <span className="block text-textDarkt py-[20px] px-[24px] w-[200px] text-base leading-[125%] font-normal">
                +993 61 2***67
              </span>
              <span className="block text-textDarkt py-[20px] px-[24px] w-[230px] text-base leading-[125%] font-normal">
                Первое, второе слово
              </span>
              <div className="flex flex-col py-[20px] px-[24px] w-[180px]  leading-[125%] font-normal">
                <span className="text-textDarkt text-base">26.01.24г.</span>
                <span className="text-textLight text-sm">14:56:29</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[10px] p-[20px] w-full bg-fillLightBgLightContr rounded-[25px]">
        <h4 className="text-base text-textDarkt font-normal leading-[150%]">
          Переход по страницам
        </h4>
        <div className="flex items-center justify-between gap-[24px]">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none">
              <path
                d="M6.54175 10.8333L8.91675 13.2083C9.08341 13.375 9.16341 13.5694 9.15675 13.7916C9.15008 14.0138 9.07008 14.2083 8.91675 14.375C8.75008 14.5416 8.5523 14.6286 8.32341 14.6358C8.09453 14.643 7.89647 14.563 7.72925 14.3958L3.91675 10.5833C3.75008 10.4166 3.66675 10.2222 3.66675 9.99995C3.66675 9.77773 3.75008 9.58328 3.91675 9.41662L7.72925 5.60412C7.89591 5.43745 8.09397 5.35773 8.32341 5.36495C8.55286 5.37217 8.75064 5.45884 8.91675 5.62495C9.06953 5.79162 9.14953 5.98606 9.15675 6.20828C9.16397 6.43051 9.08397 6.62495 8.91675 6.79162L6.54175 9.16662H15.8334C16.0695 9.16662 16.2676 9.24662 16.4276 9.40662C16.5876 9.56662 16.6673 9.7644 16.6667 9.99995C16.6667 10.2361 16.5867 10.4341 16.4267 10.5941C16.2667 10.7541 16.069 10.8338 15.8334 10.8333H6.54175Z"
                fill={`${activePage === 1 ? '#C0C0CC' : '#878799'}`}
              />
            </svg>
          </button>
          <h4
            className={`w-[24px] h-[24px] flex items-center justify-center text-sm font-medium leading-[125%] ${
              activePage === 1 ? 'text-[#4D4D99]' : 'text-fillLinkRest'
            }`}>
            1
          </h4>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none">
              <path
                d="M13.4585 10.8333H4.16683C3.93072 10.8333 3.73294 10.7533 3.5735 10.5933C3.41405 10.4333 3.33405 10.2356 3.3335 10C3.3335 9.7639 3.4135 9.56612 3.5735 9.40668C3.7335 9.24723 3.93127 9.16723 4.16683 9.16668H13.4585L11.0835 6.79168C10.9168 6.62501 10.8368 6.43057 10.8435 6.20834C10.8502 5.98612 10.9302 5.79168 11.0835 5.62501C11.2502 5.45834 11.4482 5.37168 11.6777 5.36501C11.9071 5.35834 12.1049 5.43807 12.271 5.60418L16.0835 9.41668C16.1668 9.50001 16.226 9.59029 16.261 9.68751C16.296 9.78473 16.3132 9.8889 16.3127 10C16.3127 10.1111 16.2954 10.2153 16.261 10.3125C16.2266 10.4097 16.1674 10.5 16.0835 10.5833L12.271 14.3958C12.1043 14.5625 11.9066 14.6425 11.6777 14.6358C11.4488 14.6292 11.2507 14.5422 11.0835 14.375C10.9307 14.2083 10.8507 14.0139 10.8435 13.7917C10.8363 13.5695 10.9163 13.375 11.0835 13.2083L13.4585 10.8333Z"
                fill={`${activePage !== 1 ? '#C0C0CC' : '#878799'}`}
              />
            </svg>
          </button>
        </div>
      </div>
      <button className="p-[20px] w-full text-white text-[18px] text-medium leading-[125%] bg-fillButtonAccentDefault rounded-[25px]">
        Load more
      </button>
    </div>
  );
};

export default ShopTable;
