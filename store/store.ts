import { ISearchNetije } from "@/models/quizQuestionsWinners.model";
import { create } from "zustand";

interface ILotteryStatus {
  status: "Upcoming" | "Finished" | "Ongoing";
  setStatus: (value: "Upcoming" | "Finished" | "Ongoing") => void;
}

interface IQuizSearch {
  active: boolean;
  setActive: (value: boolean) => void;
}

interface IStep {
  step: number | null;
  setStep: (value: number | null) => void;
}

interface ILoading {
  loading: boolean;
  setLoading: (value: boolean) => void;
}

interface IQuizResults {
  resultData: ISearchNetije[];
  setResultData: (value: ISearchNetije[]) => void;
  error: string;
  setError: (value: string) => void;
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

export const useSteps = create<IStep>((set) => ({
  step: null,
  setStep: (value: number | null) => set({ step: value }),
}));

export const useQuizResults = create<IQuizResults>((set) => ({
  resultData: [],
  setResultData: (value: ISearchNetije[]) => set({ resultData: value }),
  error: "",
  setError: (value: string) => set({ error: value }),
}));

export const useResultsLoading = create<ILoading>((set) => ({
  loading: false,
  setLoading: (value: boolean) => set({ loading: value }),
}));
