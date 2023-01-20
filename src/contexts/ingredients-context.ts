import { createContext } from "react";
import { FilteredData } from "../types/types";

type typeIngridientContext = {
  data: FilteredData | null;
  setData: (data: FilteredData | null) => void;
};

const initIngridientContext = {
  data: null,
  setData: () => {},
};

export const IngredientsContext = createContext<typeIngridientContext>(
  initIngridientContext
);
