import { createContext } from "react";
import { Data } from "../types/types";

type typeBunContext = {
  bun: Data | null;
  setBun: (bun: Data | null) => void;
};

const initBunContext = {
  bun: null,
  setBun: () => {},
};

export const BunContext = createContext<typeBunContext>(initBunContext);

type typeConstructorContext = {
  recipe: Data[];
  setRecipe: (recipe: Data[]) => void;
};

const initConstructorContext = {
  recipe: [] as Data[],
  setRecipe: () => {},
};

export const ConstructorContext = createContext<typeConstructorContext>(
  initConstructorContext
);

type typeOrderContext = {
  number: number | null;
  setNumber: (number: number | null) => void;
};

const initOrderContext = {
  number: null,
  setNumber: () => {},
};

export const OrderContext = createContext<typeOrderContext>(initOrderContext);
