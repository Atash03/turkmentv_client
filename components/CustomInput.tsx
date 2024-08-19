'use client';
import { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

interface ICustomInput {
  name: string;
  type?: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  isTextArea?: boolean;
  required?: boolean;
  isBlack?: boolean;
  value: {
    value: string;
    setValue: (newValue: ICustomInput['value']['value']) => void;
  };
  validate?: {
    isValid: boolean;
    errMsg: string;
  };
}

const CustomInput = ({
  value,
  name,
  isTextArea,
  label,
  placeholder,
  type,
  required,
  isBlack,
  validate,
}: ICustomInput) => {
  const [isTouched, setIsTouched] = useState<boolean>(false);
  return (
    <div className="custom-input relative">
      {label ? (
        <label
          htmlFor={name}
          className="text-black md:text-lg text-base px-4 bg-white font-mw_sans absolute -top-[14px] left-[2%]"
          style={isBlack ? { background: '#1a1a1a', color: '#fff' } : {}}>
          {label}
        </label>
      ) : null}
      {!isTextArea ? (
        <div className="flexs flex-col gap-2">
          <input
            type={type}
            name={name}
            id={name}
            required={required}
            placeholder={placeholder}
            className="p-5 border border-solid border-[#B2B1B1] rounded-[5px] font-roboto text-[#9A9A9A] md:text-[22px] text-base w-full"
            style={isBlack ? { background: '#1a1a1a', color: '#fff' } : {}}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!isTouched) {
                setIsTouched(true);
              }
              value.setValue(e.target.value);
            }}
          />
          {isTouched && validate && !validate.isValid ? (
            <span className="text-mred text-sm font-bold font-roboto">{validate.errMsg}</span>
          ) : null}
        </div>
      ) : (
        <textarea
          name={name}
          id={name}
          required={required}
          placeholder={placeholder}
          rows={5}
          className="resize-none p-5 border border-solid border-[#B2B1B1] rounded-[5px] font-roboto text-[#9A9A9A] md:text-[22px] text-base w-full"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => value.setValue(e.target.value)}
          style={isBlack ? { background: '#1a1a1a', color: '#fff' } : {}}></textarea>
      )}
    </div>
  );
};

export default CustomInput;
