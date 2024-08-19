// Working pagination =========================================================================================================

// 'use client';
// import Loader from '@/components/Loader';
// import { SmsContext } from '@/context/SmsContext';
// import clsx from 'clsx';
// import React, { useContext } from 'react';

// const SmsPagination = () => {
//   const smsContext = useContext(SmsContext);
//   if (!smsContext) {
//     throw new Error('smsContext must be used within an AuthProvider');
//   }
//   const { setCurrentPage, smsTableData } = smsContext;

//   if (!smsTableData) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col w-full gap-[10px] p-[20px] bg-fillLightBgLightContr rounded-[25px] items-center">
//       <h3 className="text-textDarkt leading-[150%] text-[16px] font-[400]">Sahypalar</h3>
//       <div className="flex gap-[24px] items-center justify-center">
//         <svg
//           className={clsx('cursor-pointer', {
//             'pointer-events-none cursor-default': smsTableData?.meta.current_page === 1,
//           })}
//           onClick={() =>
//             setCurrentPage(
//               smsTableData?.meta.current_page !== 1
//                 ? smsTableData.meta.current_page - 1
//                 : smsTableData.meta.current_page,
//             )
//           }
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M8.5415 12.8333L10.9165 15.2083C11.0832 15.375 11.1632 15.5694 11.1565 15.7916C11.1498 16.0138 11.0698 16.2083 10.9165 16.375C10.7498 16.5416 10.5521 16.6286 10.3232 16.6358C10.0943 16.643 9.89623 16.563 9.729 16.3958L5.9165 12.5833C5.74984 12.4166 5.6665 12.2222 5.6665 12C5.6665 11.7777 5.74984 11.5833 5.9165 11.4166L9.729 7.60412C9.89567 7.43745 10.0937 7.35773 10.3232 7.36495C10.5526 7.37217 10.7504 7.45884 10.9165 7.62495C11.0693 7.79162 11.1493 7.98606 11.1565 8.20828C11.1637 8.43051 11.0837 8.62495 10.9165 8.79162L8.5415 11.1666H17.8332C18.0693 11.1666 18.2673 11.2466 18.4273 11.4066C18.5873 11.5666 18.6671 11.7644 18.6665 12C18.6665 12.2361 18.5865 12.4341 18.4265 12.5941C18.2665 12.7541 18.0687 12.8338 17.8332 12.8333H8.5415Z"
//             fill={smsTableData?.meta.current_page === 1 ? '#C0C0CC' : '#878799'}
//           />
//         </svg>
//         <span className="text-fillLinkRest text-[14px] font-[500] leading-[125%]">
//           {smsTableData?.meta.current_page}/{smsTableData?.meta.last_page}
//         </span>
//         <svg
//           onClick={() =>
//             setCurrentPage(
//               smsTableData?.meta.current_page !== smsTableData.meta.last_page
//                 ? smsTableData.meta.current_page + 1
//                 : smsTableData.meta.last_page,
//             )
//           }
//           className={clsx('cursor-pointer', {
//             'pointer-events-none cursor-default':
//               smsTableData?.meta.current_page === smsTableData?.meta.last_page,
//           })}
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M15.4585 12.8332H6.16683C5.93072 12.8332 5.73294 12.7532 5.5735 12.5932C5.41405 12.4332 5.33405 12.2354 5.3335 11.9999C5.3335 11.7638 5.4135 11.566 5.5735 11.4066C5.7335 11.2471 5.93127 11.1671 6.16683 11.1666H15.4585L13.0835 8.79155C12.9168 8.62489 12.8368 8.43044 12.8435 8.20822C12.8502 7.986 12.9302 7.79155 13.0835 7.62489C13.2502 7.45822 13.4482 7.37155 13.6777 7.36489C13.9071 7.35822 14.1049 7.43794 14.271 7.60405L18.0835 11.4166C18.1668 11.4999 18.226 11.5902 18.261 11.6874C18.296 11.7846 18.3132 11.8888 18.3127 11.9999C18.3127 12.111 18.2954 12.2152 18.261 12.3124C18.2266 12.4096 18.1674 12.4999 18.0835 12.5832L14.271 16.3957C14.1043 16.5624 13.9066 16.6424 13.6777 16.6357C13.4488 16.6291 13.2507 16.5421 13.0835 16.3749C12.9307 16.2082 12.8507 16.0138 12.8435 15.7916C12.8363 15.5693 12.9163 15.3749 13.0835 15.2082L15.4585 12.8332Z"
//             fill={
//               smsTableData?.meta.current_page === smsTableData?.meta.last_page
//                 ? '#C0C0CC'
//                 : '#878799'
//             }
//           />
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default SmsPagination;

// Working pagination =================================================================================================

'use client';
import Loader from '@/components/Loader';
import { SmsContext } from '@/context/SmsContext';
import clsx from 'clsx';
import React, { useContext } from 'react';

const SmsPagination = () => {
  const smsContext = useContext(SmsContext);
  if (!smsContext) {
    throw new Error('smsContext must be used within an AuthProvider');
  }
  const { setCurrentPage, smsTableData } = smsContext;

  if (!smsTableData) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const { current_page, last_page } = smsTableData.meta;

  const generatePageNumbers = () => {
    const pages = [];
    if (last_page <= 7) {
      for (let i = 1; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current_page > 4) pages.push('...');
      const startPage = Math.max(2, current_page - 2);
      const endPage = Math.min(last_page - 1, current_page + 2);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (current_page < last_page - 3) pages.push('...');
      pages.push(last_page);
    }
    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className="flex flex-col w-full gap-[10px] p-[20px] bg-fillLightBgLightContr rounded-[25px] items-center">
      <h3 className="text-textDarkt leading-[150%] text-[16px] font-[400]">Sahypalar</h3>
      <div className="flex gap-[24px] items-center justify-center">
        <svg
          className={clsx('cursor-pointer', {
            'pointer-events-none cursor-default': current_page === 1,
          })}
          onClick={() => setCurrentPage(current_page !== 1 ? current_page - 1 : current_page)}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.5415 12.8333L10.9165 15.2083C11.0832 15.375 11.1632 15.5694 11.1565 15.7916C11.1498 16.0138 11.0698 16.2083 10.9165 16.375C10.7498 16.5416 10.5521 16.6286 10.3232 16.6358C10.0943 16.643 9.89623 16.563 9.729 16.3958L5.9165 12.5833C5.74984 12.4166 5.6665 12.2222 5.6665 12C5.6665 11.7777 5.74984 11.5833 5.9165 11.4166L9.729 7.60412C9.89567 7.43745 10.0937 7.35773 10.3232 7.36495C10.5526 7.37217 10.7504 7.45884 10.9165 7.62495C11.0693 7.79162 11.1493 7.98606 11.1565 8.20828C11.1637 8.43051 11.0837 8.62495 10.9165 8.79162L8.5415 11.1666H17.8332C18.0693 11.1666 18.2673 11.2466 18.4273 11.4066C18.5873 11.5666 18.6671 11.7644 18.6665 12C18.6665 12.2361 18.5865 12.4341 18.4265 12.5941C18.2665 12.7541 18.0687 12.8338 17.8332 12.8333H8.5415Z"
            fill={current_page === 1 ? '#C0C0CC' : '#878799'}
          />
        </svg>
        {pages.map((page, index) => (
          <span
            key={index}
            className={clsx('text-[14px] font-[500] leading-[125%]', {
              'cursor-pointer text-[#878799]': page !== '...' && page !== current_page,
              'cursor-default text-gray-400': page === '...',
              'cursor-pointer text-[#4D4D99] font-semibold': page === current_page,
            })}
            onClick={() => typeof page === 'number' && setCurrentPage(page)}>
            {page}
          </span>
        ))}
        <svg
          onClick={() => setCurrentPage(current_page !== last_page ? current_page + 1 : last_page)}
          className={clsx('cursor-pointer', {
            'pointer-events-none cursor-default': current_page === last_page,
          })}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15.4585 12.8332H6.16683C5.93072 12.8332 5.73294 12.7532 5.5735 12.5932C5.41405 12.4332 5.33405 12.2354 5.3335 11.9999C5.3335 11.7638 5.4135 11.566 5.5735 11.4066C5.7335 11.2471 5.93127 11.1671 6.16683 11.1666H15.4585L13.0835 8.79155C12.9168 8.62489 12.8368 8.43044 12.8435 8.20822C12.8502 7.986 12.9302 7.79155 13.0835 7.62489C13.2502 7.45822 13.4482 7.37155 13.6777 7.36489C13.9071 7.35822 14.1049 7.43794 14.271 7.60405L18.0835 11.4166C18.1668 11.4999 18.226 11.5902 18.261 11.6874C18.296 11.7846 18.3132 11.8888 18.3127 11.9999C18.3127 12.111 18.2954 12.2152 18.261 12.3124C18.2266 12.4096 18.1674 12.4999 18.0835 12.5832L14.271 16.3957C14.1043 16.5624 13.9066 16.6424 13.6777 16.6357C13.4488 16.6291 13.2507 16.5421 13.0835 16.3749C12.9307 16.2082 12.8507 16.0138 12.8435 15.7916C12.8363 15.5693 12.9163 15.3749 13.0835 15.2082L15.4585 12.8332Z"
            fill={current_page === last_page ? '#C0C0CC' : '#878799'}
          />
        </svg>
      </div>
    </div>
  );
};

export default SmsPagination;
