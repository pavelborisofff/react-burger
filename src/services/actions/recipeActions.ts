import { Data } from '../../types/types';

export const INGREDIENT_ADD = "INGREDIENT_ADD";
export const INGREDIENT_REMOVE = "INGREDIENT_REMOVE";
export const BUN_ADD = "BUN_ADD";
export const BUN_REMOVE = "BUN_REMOVE";
export const INGREDIENTS_SET = "INGREDIENTS_SET";
export const INGREDIENTS_RESET = "INGREDIENTS_RESET";

export enum RECIPE_ACTIONS {
  INGREDIENT_ADD,
  INGREDIENT_REMOVE,
  BUN_ADD,
  BUN_REMOVE,
  INGREDIENTS_SET,
  INGREDIENTS_RESET,
}

export type RecipeActionTypes =
  | { type: typeof INGREDIENT_ADD; payload: Data }
  | { type: typeof INGREDIENT_REMOVE; payload: Data }
  | { type: typeof BUN_ADD; payload: Data }
  | { type: typeof BUN_REMOVE; payload: Data }
  | { type: typeof INGREDIENTS_SET; payload: Data[] }
  | { type: typeof INGREDIENTS_RESET };

