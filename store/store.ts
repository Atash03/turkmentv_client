import { create } from "zustand";

interface ILotteryStatus {
  status: "Upcoming" | "Finished" | "Ongoing";
  setStatus: (value: "Upcoming" | "Finished" | "Ongoing") => void;
}

interface IQuizSearch {
  active: boolean;
  setActive: (value: boolean) => void;
}

export const useLotteryStatus = create<ILotteryStatus>((set) => ({
  status: "Upcoming",
  setStatus: (value: "Upcoming" | "Finished" | "Ongoing") =>
    set({ status: value }),
}));

export const useQuizSearchActive = create<IQuizSearch>((set) => ({
  active: false,
  setActive: (value: boolean) => set({ active: value }),
}));
