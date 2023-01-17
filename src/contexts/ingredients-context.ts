import { createContext } from 'react';
import { Data } from '../utils/types';


export const IngredientsContext = createContext<Data[]>([]);