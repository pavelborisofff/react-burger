import { createContext } from 'react';
import { FilteredData } from '../utils/types';


export const IngredientsContext = createContext<FilteredData>({} as FilteredData);