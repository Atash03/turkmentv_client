'use client';

import Link from 'next/link';
import { FormEvent } from 'react';
import AuthInput from './AuthInput';
import Button from '../Button';
const LoginForm = () => {
  return (
    <div className="py-10">
      <div className="login max-w-[455px] w-full h-fit rounded-[15px] shadow-form bg-white py-12 px-11 flex flex-col gap-10">
        <h1 className="text-[32px] font-lighter  text-black font-mw_sans text-center uppercase">
          Hasabyňyza giriň
        </h1>
        <form onSubmit={(e: FormEvent) => e.preventDefault()} className="flex flex-col gap-4">
          <AuthInput id="tel_mail" placeholder="Telefon ýa-da Email" type="text" required />
          <AuthInput id="password" placeholder="Açar söz" type="password" required />
          <Button name="Hasap aç" type="submit" width="100%" onClick={() => null} />
        </form>

        <Link
          href={'/auth/recovery'}
          className="font-roboto text-base text-black flex justify-center">
          <span className="border-b-2 border-black border-solid">Açar sözi unytdym!</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
