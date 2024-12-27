'use client';

import { Queries } from '@/api/queries';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useLotteryAuth } from '@/store/useLotteryAuth';

const LotteryAuthForm = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useLotteryAuth((state) => state.setAuth);

  const validatePhone = (value: string) => {
    const phoneRegex = /^99363\d{6}$/;
    return phoneRegex.test(value);
  };

  const validateCode = (value: string) => {
    const codeRegex = /^\d-\d{10}$/;
    return codeRegex.test(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePhone(phone)) {
      setError('Telefon belgisi nädogry formatda');
      return;
    }

    if (!validateCode(code)) {
      setError('Kod nädogry formatda');
      return;
    }

    setIsLoading(true);

    try {
      const response = await Queries.authenticateLottery(phone, code);
      setAuth(response, phone, code);
      router.replace('/lottery');
    } catch (err) {
      console.error('Authentication error:', err);
      setError('Telefon belgisi ýa-da kod nädogry');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length <= 11) {
      // Limit to 11 digits (99363 + 6 digits)
      setPhone(value);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 12) {
      // Limit to 12 characters (X-XXXXXXXXXX)
      setCode(value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-lightSurfaceContainer rounded-[24px] p-[40px] w-[530px] flex flex-col gap-[24px]">
      <h1 className="text-display3 font-[500] leading-display3">Lotereýa giriş</h1>
      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[8px]">
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
            placeholder="99363XXXXXX"
            required
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <input
            type="text"
            value={code}
            onChange={handleCodeChange}
            className="px-[16px] py-[12px] bg-lightPrimaryContainer rounded-[12px] outline-none text-lightOnSurfaceVariant text-textSmall leading-textSmall"
            placeholder="5-0102030408"
            required
          />
        </div>
        {error && <p className="text-lightError text-textSmall leading-textSmall">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading || !phone || !code}
        className="text-textLarge leading-textLarge py-[12px] w-full flex justify-center items-center rounded-[12px] bg-lightPrimary font-medium text-lightOnPrimary disabled:opacity-50">
        {isLoading ? 'Ýüklenilýär...' : 'Giriş'}
      </button>
    </form>
  );
};

export default LotteryAuthForm;
