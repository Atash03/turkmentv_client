import { create } from 'zustand';
import { ILotteryResponse } from '@/models/lottery/lottery.model';
import { persist } from 'zustand/middleware';

interface LotteryAuthState {
  isAuthenticated: boolean;
  lotteryData: ILotteryResponse | null;
  phone: string | null;
  code: string | null;
  setAuth: (data: ILotteryResponse, phone: string, code: string) => void;
  logout: () => void;
}

export const useLotteryAuth = create<LotteryAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      lotteryData: null,
      phone: null,
      code: null,
      setAuth: (data, phone, code) =>
        set({
          isAuthenticated: true,
          lotteryData: data,
          phone,
          code,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          lotteryData: null,
          phone: null,
          code: null,
        }),
    }),
    {
      name: 'lottery-auth-storage',
    },
  ),
);
