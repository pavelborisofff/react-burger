import { combineReducers } from '@reduxjs/toolkit';

import ingredientsReducer from './ingredientsReducer';
import recipeReducer from './recipeReducer';
import orderReducer from './orderReducer';
import authReducer from './authReducer';
import wsReducer from './wsReducer';

describe('rootReducer', () => {
  it('should return the combined reducers', () => {
    const rootReducer = combineReducers({
      ingredients: ingredientsReducer,
      recipe: recipeReducer,
      order: orderReducer,
      auth: authReducer,
      feed: wsReducer,
    });

    expect(rootReducer).toBeInstanceOf(Function);
    // expect(Object.keys(rootReducer({}))).toEqual([
    //   'ingredients',
    //   'recipe',
    //   'order',
    //   'auth',
    //   'feed'
    // ]);
  });
});
