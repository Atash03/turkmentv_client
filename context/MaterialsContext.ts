"use client";
import { IMaterialsContext } from "@/typings/context.type";
import { createContext } from "react";

const MaterialsContext = createContext<IMaterialsContext>(
  {} as IMaterialsContext
);

export default MaterialsContext;
