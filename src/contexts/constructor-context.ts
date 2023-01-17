import { createContext } from 'react';
import { Data } from '../utils/types';


// interface IBunContextData {
//   bun: Data | null;
//   setBun: React.Dispatch<React.SetStateAction<Data>>;
// }

// const BunContextInitial: IBunContextData = {
//   bun: null,
//   setBun: () => {},
// };



export const ConstructorContext = createContext<Data[]>([]);
// TODO: как здесь тип описать? должно же быть типовое решение для объекта, 
// используемого в качестве контекста, и который может быть пустым (с null ругается в main.tsx)
// Если просто строку использовать, createContext<string>('') и BunContext.Provider value={{ bun, setBun }} не работает (вот этого вообще не могу понять, почему).
export const BunContext = createContext({});