"use client";
import { IGlobalContext } from "@/typings/context.type";
import { createContext } from "react";

const GlobalContext = createContext<IGlobalContext>({} as IGlobalContext);

export default GlobalContext;
