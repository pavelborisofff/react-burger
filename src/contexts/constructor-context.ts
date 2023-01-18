import { createContext } from 'react';
import { Data } from '../utils/types';


interface IBunContextData {
  bun: Data | null;
  setBun: React.Dispatch<React.SetStateAction<Data>>;
}

export const BunContextInitial: IBunContextData = {
  bun: {} as Data,
  setBun: () => {},
};

export interface IConstructorContextData {
  recepie: Data[];
  setRecepie: React.Dispatch<React.SetStateAction<Data[]>>;
}

export const ConstructorContextInitial: IConstructorContextData = {
  recepie: [] as Data[],
  setRecepie: () => {},
};

export interface IOrderContextData {
  number: number,
  setNumber: React.Dispatch<React.SetStateAction<number>>,
}

export const OrderContextInitial: IOrderContextData = {
  number: 0,
  setNumber: () => {},
};


export const ConstructorContext = createContext<IConstructorContextData>(ConstructorContextInitial);
export const BunContext = createContext<IBunContextData>(BunContextInitial);
export const OrderContext = createContext<IOrderContextData>(OrderContextInitial);