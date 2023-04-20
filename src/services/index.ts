import { configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkMiddleware} from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import rootReducer from './reducers/rootReducer';
import { AuthActionTypes } from './actions/authActions';
import { IngredientsActionsType } from './actions/ingredientsActions';
import { OrderActionTypes } from './actions/orderActions';
import { RecipeActionTypes } from './actions/recipeActions';


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
});

type TApplicationActions = AuthActionTypes
  | IngredientsActionsType
  | OrderActionTypes
  | RecipeActionTypes

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
export default store;