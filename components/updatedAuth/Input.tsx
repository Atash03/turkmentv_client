'use client';
import { useState } from 'react';

interface IProps {
  id: string;
  placeholder: string;
  type: 'email' | 'text' | 'password';
  required?: boolean;
  label?: string;
}

const Input = ({ id, placeholder, type, required, label }: IProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <div className="auth-input relative w-full flex flex-col gap-1">
      {label ? (
        <label className="leading-[150%] text-base font-semibold" htmlFor={id}>
          {label}
        </label>
      ) : null}
      <div className="w-full relative">
        <input
          type={type === 'password' ? (isVisible ? 'text' : type) : type}
          required={required}
          name={id}
          id={id}
          placeholder={placeholder}
          className="text-[#000000] font-medium text-base bg-[#E6E6FA] rounded-[12px] px-[16px] py-[12px] w-full outline-none"
        />
        {type === 'password' ? (
          <>
            {/* Password Hidden icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-5 top-[50%] -translate-y-[50%] transition-all opacity-100 cursor-pointer"
              style={
                !isVisible
                  ? { opacity: 1, pointerEvents: 'all' }
                  : { opacity: 0, pointerEvents: 'none' }
              }
              onClick={() => setIsVisible(!isVisible)}>
              <path
                d="M12 17.5C8.2 17.5 4.8 15.4 3.2 12H1C2.7 16.4 7 19.5 12 19.5C17 19.5 21.3 16.4 23 12H20.8C19.2 15.4 15.8 17.5 12 17.5Z"
                fill="#636370"
              />
            </svg>

            {/* Password Visible icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="absolute right-5 top-[50%] -translate-y-[50%] transition-all opacity-100 cursor-pointer"
              style={
                isVisible
                  ? { opacity: 1, pointerEvents: 'all' }
                  : { opacity: 0, pointerEvents: 'none' }
              }
              onClick={() => setIsVisible(!isVisible)}>
              <path
                d="M12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9ZM12 4.5C17 4.5 21.27 7.61 23 12C21.27 16.39 17 19.5 12 19.5C7 19.5 2.73 16.39 1 12C2.73 7.61 7 4.5 12 4.5ZM3.18 12C3.98825 13.6503 5.24331 15.0407 6.80248 16.0133C8.36165 16.9858 10.1624 17.5013 12 17.5013C13.8376 17.5013 15.6383 16.9858 17.1975 16.0133C18.7567 15.0407 20.0117 13.6503 20.82 12C20.0117 10.3497 18.7567 8.95925 17.1975 7.98675C15.6383 7.01424 13.8376 6.49868 12 6.49868C10.1624 6.49868 8.36165 7.01424 6.80248 7.98675C5.24331 8.95925 3.98825 10.3497 3.18 12Z"
                fill="#636370"
              />
            </svg>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Input;
