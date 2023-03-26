

import { Data } from '../../types/types';
import { INGREDIENT_ADD, INGREDIENT_REMOVE, BUN_ADD, BUN_REMOVE, INGREDIENTS_SET, INGREDIENTS_RESET, RecipeActionTypes } from '../actions/recipeActions';


interface IRecipeState {
  usedIngredients: Data[];
  bun: Data | null;
  payload: Data | null;
  bill: number;
  usedCount: { [key: string]: number };
};

const initialRecipe:IRecipeState = {
  usedIngredients: [],
  bun: null,
  payload: null,
  bill: 0,
  usedCount: {},
};

const recipeReducer = (state = initialRecipe, action: RecipeActionTypes):IRecipeState => {
  switch (action.type) {
    case INGREDIENT_ADD:
      return {
        ...state,
        usedIngredients: [...state.usedIngredients, action.payload],
        usedCount: {
          ...state.usedCount,
          [action.payload._id]: state.usedCount[action.payload._id] + 1 || 1,
        },
        bill: state.bill + action.payload.price,
      };

    case INGREDIENT_REMOVE:
      return {
        ...state,
        usedIngredients: state.usedIngredients.filter((item:Data) => item.uuid !== action.payload.uuid),
        usedCount: {
          ...state.usedCount,
          [action.payload._id]: state.usedCount[action.payload._id] - 1,
        },
        bill: state.bill - action.payload.price,
      };
    case BUN_ADD:
      return {
        ...state,
        bun: action.payload,
        usedCount: {
          ...state.usedCount,
          [action.payload._id]: 2,
        },
        bill: state.bill + action.payload.price * 2,
      };
    case BUN_REMOVE:
      const currentBun = state.bun;

      if (!currentBun) return state;

      return {
        ...state,
        bun: null,
        usedCount: {
          ...state.usedCount,
          [currentBun._id]: 0,
        },
        bill: state.bill - currentBun.price * 2,
      };
    case INGREDIENTS_SET:
      return {
        ...state,
        usedIngredients: action.payload,
      };
    case INGREDIENTS_RESET:
      return {
        ...state,
        usedIngredients: [],
        bun: null,
        bill: 0,
        usedCount: {},
      };
    default:
      return state;
  }
};

export default recipeReducer;

