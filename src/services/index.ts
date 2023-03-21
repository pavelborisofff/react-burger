import { Action, AnyAction, configureStore } from '@reduxjs/toolkit';
import thunk, { ThunkAction } from 'redux-thunk';

import rootReducer from './reducers/rootReducer';


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ReturnType = void> = ThunkAction<Action, RootState, unknown, AnyAction>
export default store;