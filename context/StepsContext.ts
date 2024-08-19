"use client";
import { IStepsContext } from "@/typings/context.type";
import { createContext } from "react";

const StepsContext = createContext<IStepsContext>({} as IStepsContext);

export default StepsContext;
