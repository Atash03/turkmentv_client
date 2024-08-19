'use client';
import CustomInput from '../CustomInput';
import { Dispatch, FormEvent, SetStateAction, useContext, useEffect } from 'react';
import StepsContext from '@/context/StepsContext';
import ButtonPrimary from './ButtonPrimary';
import { FormActionType } from '@/providers/StepsProvider';
import Loader from '../Loader';
import { Validator } from '@/utils/validator';
import Image from 'next/image';
import closeIcon from '@/public/close-white.svg';

const Calculator = () => {
  const { data, stepContext, calculatorContext } = useContext(StepsContext);
  const { plans } = data.plans;
  const { form, dispatch } = useContext(StepsContext).addPostContext;

  const validateForm = () => {
    if (Validator.number(form.second) && Validator.number(form.day) && form.folder_id.length > 0)
      return true;
    else return false;
  };

  const calculate = () => {
    const price = plans?.data.find((item) => item.id === Number(form.folder_id))?.total_price;
    if (price)
      dispatch({
        type: FormActionType.TOTAL,
        payload: String(Math.ceil(Number(price) * (Number(form.second) / 60) * Number(form.day))),
      });
  };

  useEffect(() => {
    if (validateForm()) {
      calculate();
    }
  }, [form.folder_id, form.day, form.second]);

  return (
    <div className="fixed top-0 left-0 w-screen px-5 h-screen bg-[#0000004f] flex items-center justify-center z-50">
      {plans ? (
        <form
          className="bg-[#1a1a1a] px-4 py-6 rounded-lg flex flex-col gap-8 max-w-[480px] h-fit"
          onSubmit={(e: FormEvent) => e.preventDefault()}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2 font-mw_sans text-white font-[500]">
              <h3 className="text-[20px]">Calculator</h3>
              <p className="text-base">Sargyt etmek üçin aşakdaky maglumatlary dolduryň</p>
            </div>
            <div
              className="w-[24px] h-[24px] relative  p-1 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => calculatorContext.setCalculatorOpen(false)}>
              <Image src={closeIcon} fill alt="close" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <CustomInput
              value={{
                value: form.second,
                setValue: (newValue) =>
                  dispatch({ type: FormActionType.SECOND, payload: newValue }),
              }}
              name="second"
              label="Näçe sekunt"
              type="text"
              isBlack
              validate={{
                errMsg: 'This field must a be number',
                isValid: Validator.number(form.second),
              }}
            />
            <CustomInput
              value={{
                value: form.day,
                setValue: (newValue) => dispatch({ type: FormActionType.DAY, payload: newValue }),
              }}
              name="day"
              label="Näçe gün"
              type="text"
              isBlack
              validate={{
                errMsg: 'This field must a be number',
                isValid: Validator.number(form.day),
              }}
            />
          </div>
          <div className="text-white text-[22px] flex flex-col">
            <p className="font-mw_sans font-[500]">Jemi baha: </p>
            <span className="font-redhat w-fit" style={validateForm() ? { background: 'red' } : {}}>
              {form.total || 0} TMT
            </span>
          </div>
          <div className="flex gap-3 justify-end">
            <ButtonPrimary
              disabled={!validateForm()}
              name="Indiki"
              onClick={() => {
                stepContext.setStep(3);
                calculatorContext.setCalculatorOpen(false);
              }}
              type="button"
            />
          </div>
        </form>
      ) : (
        <Loader height={200} />
      )}
    </div>
  );
};
export default Calculator;
