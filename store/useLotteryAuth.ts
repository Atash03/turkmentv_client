import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ILotteryResponse } from "@/models/lottery/lottery.model";

interface LotteryAuthState {
  isAuthenticated: boolean;
  lotteryData: ILotteryResponse | null;
  setAuth: (data: ILotteryResponse) => void;
  clearAuth: () => void;
  logout: () => void;
}

export const useLotteryAuth = create<LotteryAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      lotteryData: null,
      setAuth: (data) => set({ isAuthenticated: true, lotteryData: data }),
      clearAuth: () => set({ isAuthenticated: false, lotteryData: null }),
      logout: () => {
        console.log("Logging out from lottery...");
        set({ isAuthenticated: false, lotteryData: null });
        // Could add additional cleanup here if needed
      },
    }),
    {
      name: "lottery-auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        lotteryData: state.lotteryData,
      }),
    }
  )
);
