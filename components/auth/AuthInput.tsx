'use client';
import { AiTwotoneEyeInvisible } from 'react-icons/ai';
import { AiTwotoneEye } from 'react-icons/ai';
import { useState } from 'react';

import { IAuthInput } from '@/typings/auth-input.type';

const AuthInput = ({ id, placeholder, type, required, label }: IAuthInput) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className="auth-input relative w-full">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        type={type === 'password' ? (isVisible ? 'text' : type) : type}
        required={required}
        name={id}
        id={id}
        placeholder={placeholder}
        className="text-[#474747] font-mw_sans font-normal text-base bg-[#F5F5F5] rounded-[5px] p-4 w-full outline-none"
      />
      {type === 'password' ? (
        <>
          <AiTwotoneEye
            color="#474747"
            width={20}
            height={20}
            className="w-5 h-5 absolute right-5 top-[50%] -translate-y-[50%] transition-all opacity-100 cursor-pointer"
            style={
              isVisible
                ? { opacity: 1, pointerEvents: 'all' }
                : { opacity: 0, pointerEvents: 'none' }
            }
            onClick={() => setIsVisible(!isVisible)}
          />
          <AiTwotoneEyeInvisible
            color="#474747"
            width={20}
            height={20}
            className="w-5 h-5 absolute right-5 top-[50%] -translate-y-[50%] transition-all opacity-100 cursor-pointer"
            style={
              !isVisible
                ? { opacity: 1, pointerEvents: 'all' }
                : { opacity: 0, pointerEvents: 'none' }
            }
            onClick={() => setIsVisible(!isVisible)}
          />
        </>
      ) : null}
    </div>
  );
};

export default AuthInput;
