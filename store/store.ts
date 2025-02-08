import { create } from "zustand";

interface ILotteryStatus {
  status: "Upcoming" | "Finished" | "Ongoing";
  setStatus: (value: "Upcoming" | "Finished" | "Ongoing") => void;
}

export const useLotteryStatus = create<ILotteryStatus>((set) => ({
  status: "Upcoming",
  setStatus: (value: "Upcoming" | "Finished" | "Ongoing") =>
    set({ status: value }),
}));
