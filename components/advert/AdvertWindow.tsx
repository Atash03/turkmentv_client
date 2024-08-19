'use client';
import Step from './Step';
import { v4 } from 'uuid';
import WindowOne from './windows/WindowOne';
import { useContext, useEffect } from 'react';
import StepsContext from '@/context/StepsContext';
import { AnimatePresence } from 'framer-motion';
import WindowTwo from './windows/WindowTwo';
import WindowThree from './windows/WindowThree';
import Calculator from './Calculator';

const AdvertWindow = () => {
  const { stepContext, calculatorContext } = useContext(StepsContext);

  const { step } = stepContext;

  const stepNames = [
    'Mahabat ýerleşdirmek üçin 3 ädimi yzarlaň!',
    'Mahabat ýerleşdirmek üçin 3 ädimi yzarlaň!',
    'Mahabat ýerleşdirmek üçin 3 ädimi yzarlaň!',
  ];

  useEffect(() => {
    calculatorContext.calculatorOpen
      ? (window.document.body.style.overflowY = 'hidden')
      : (window.document.body.style.overflowY = 'auto');
  }, [calculatorContext.calculatorOpen]);

  return (
    <div className="advert-window flex flex-col gap-14 py-14 h-full max-w-[1000px] w-full">
      <h1 className="font-mw_sans font-bold text-black text-[32px]">
        Mahabat ýerleşdirmek üçin 3 ädimi yzarlaň!
      </h1>
      <div className="bg-white rounded-[10px] border border-solid border-[#D1D1D1] shadow-form md:p-8 p-4 md:block flex items-start gap-6">
        <div
          className="steps md:grid md:grid-cols-3 md:gap-2 h-full gap-2 flex flex-col justify-between"
          // style={{
          //   gridTemplateColumns: 'repeat(3, 1fr) auto',
          // }}
        >
          {stepNames.map((value, index) => (
            <div className="h-full flex flex-col items-center gap-2" key={v4()}>
              <Step last={index === 2} name={value} number={(index + 1) as 1 | 2 | 3} key={v4()} />
              {index !== 2 ? (
                index !== step ? (
                  <div className="min-h-[100px] md:hidden block h-full w-1 rounded bg-[#08CB9C]"></div>
                ) : (
                  <div className="min-h-[100px] md:hidden block h-full w-1 rounded bg-[#b8c4b2]"></div>
                )
              ) : null}
            </div>
          ))}
        </div>
        <div className="windows overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && <WindowOne />}
            {step === 2 && <WindowTwo />}
            {step === 3 && <WindowThree />}
          </AnimatePresence>
          {calculatorContext.calculatorOpen ? <Calculator /> : null}
        </div>
      </div>
    </div>
  );
};

export default AdvertWindow;
