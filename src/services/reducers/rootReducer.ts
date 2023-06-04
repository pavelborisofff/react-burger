import { combineReducers } from "@reduxjs/toolkit";

import ingredientsReducer from './ingredientsReducer';
import recipeReducer from './recipeReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';
import wsReducer from "./wsReducer";


const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  recipe: recipeReducer,
  order: orderReducer,
  auth: authReducer,
  feed: wsReducer,
});

export default rootReducer;