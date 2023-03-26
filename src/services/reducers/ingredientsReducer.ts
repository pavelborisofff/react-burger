import { Data } from '../../types/types';
import {
  INGREDIENTS_REQUEST,
  INGREDIENTS_REQUEST_SUCCESS,
  INGREDIENTS_REQUEST_ERROR,
  IPreparedData,
  IngredientsActionsType,
} from '../actions/ingredientsActions';



interface IInitialState  {
  ingredients: IPreparedData | null;
  ingredientsRaw?: Data[],
  isLoading: boolean;
  isError: boolean;
}


export const initialState:IInitialState = {
  ingredients: null,
  isLoading: false,
  isError: false,
};


const ingredientsReducer = (state = initialState, action: IngredientsActionsType):IInitialState => {
  switch (action.type) {
    case INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case INGREDIENTS_REQUEST_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRaw: action.ingredientsRaw,
        isLoading: false,
        isError: false,
      };
    case INGREDIENTS_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
