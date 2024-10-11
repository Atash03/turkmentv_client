'use client';
import Link from 'next/link';
import React, { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { GiftsType } from '@/typings/gifts/gifts.type';

// Define the expected shape of the API response

const SmsForm: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  // TanStack Query mutation for the API request
  const mutation = useMutation<GiftsType, Error, string>({
    mutationKey: [`gifts-${inputValue}`], // Using the dynamic query key
    mutationFn: (code: string) => axios.get(`https://sms.turkmentv.gov.tm/api/gifts/${code}`),
    onSuccess: (data) => {
      // Cache the data explicitly
      queryClient.setQueryData([`gifts-${inputValue}`], data);

      // Clear any previous error message
      setErrorMessage(null);

      // Redirect to "prizes/${inputValue}" on success
      router.push(`/prizes/${inputValue}`);
    },
    onError: (error) => {
      // Set error message when API request fails
      setErrorMessage('Промокод не действителен. Пожалуйста, попробуйте еще раз.');
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue.length === 6) {
      mutation.mutate(inputValue);
    }
  };

  // Clear error message after 10 seconds
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null);
      }, 10000);

      return () => clearTimeout(timer); // Cleanup timeout if component unmounts
    }
  }, [errorMessage]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-lightSurface rounded-[24px] p-[40px] w-fit flex flex-col gap-[24px] shadow-lightBoxShadow1">
      <h1 className="text-display3 font-[500] leading-display3 ">Вход в «подарошную»</h1>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-textBasebase font-medium leading-textBase">Промокод</h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
          placeholder="Введите свой промокод"
        />
        {errorMessage && (
          <p className="text-lightError text-textSmall leading-textSmall">{errorMessage}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={inputValue.length !== 6 || mutation.isLoading}
        className="text-textLarge leading-textLarge py-[12px] w-full flex justify-center items-center rounded-[12px] bg-lightPrimary font-medium text-lightOnPrimary">
        {mutation.isLoading ? 'Loading...' : 'Войти'}
      </button>
    </form>
  );
};

export default SmsForm;
