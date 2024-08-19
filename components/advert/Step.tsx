'use client';

import StepsContext from '@/context/StepsContext';
import { useCallback, useContext, useState } from 'react';

interface IStep {
  number: 1 | 2 | 3;
  name: string;
  last: boolean;
}

const Step = ({ number, name, last }: IStep) => {
  const { stepContext } = useContext(StepsContext);
  const { step, setStep } = stepContext;
  return (
    <div
      className="step flex md:flex-row md:w-full flex-col items-center h-fit w-fit justify-start"
      style={last ? { gridTemplateColumns: '51px 130px' } : {}}>
      <div
        className="step-circle w-[45px] h-[45px] rounded-full bg-[#131369] relative transition-all flex items-center justify-center"
        style={step === number ? { background: ' #131369' } : {}}>
        <div
          className="step-tick absolute top-0 left-0 bg-step-tick w-full h-full rounded-full opacity-0 transition-all z-10"
          style={step !== number ? { opacity: 1 } : {}}></div>
        <div
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-full w-full h-full border border-solid border-[#131369] transition-all pointer-events-none"
          style={
            step === number ? { width: '51px', height: '51px', opacity: 1 } : { opacity: 0 }
          }></div>
        <span className="font-roboto font-bold flex items-center justify-center text-2xl text-center text-white transition-all w-[45px] h-[45px]">
          {number}
        </span>
      </div>
      <p
        className="step-name md:block hidden font-mw_sans font-light text-black ml-2 max-w-[130px]"
        onClick={() => setStep(number)}>
        {name}
      </p>
      {!last ? (
        <div className="step-line bg-step_line bg-repeat md:block hidden md:w-full h-full w-1  md:h-0.5  overflow-hidden">
          <div
            className="h-full z-10 w-0 bg-[#08CB9C] transition-all"
            style={step !== number ? { width: '100%' } : {}}></div>
        </div>
      ) : null}
    </div>
  );
};

export default Step;
