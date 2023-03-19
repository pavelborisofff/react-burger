import { combineReducers } from "@reduxjs/toolkit";

import ingredientsReducer from './ingredientsReducer';
import modalReducer from './modalReducer';
import recipeReducer from './recipeReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';


const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  recipe: recipeReducer,
  order: orderReducer,
  auth: authReducer,
});

export default rootReducer;