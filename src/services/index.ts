import { configureStore, createAction } from '@reduxjs/toolkit';
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware} from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import rootReducer from './reducers/rootReducer';
import { AuthActionTypes } from './actions/authActions';
import { IngredientsActionsType } from './actions/ingredientsActions';
import { OrderActionTypes } from './actions/orderActions';
import { RecipeActionTypes } from './actions/recipeActions';
import { TwsActions } from './actions/wsActions';
import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from 'react-redux';
import { createSocketMiddleware } from './middleware/wsMiddleware';



// const wsActions: TwsActions = {
//   wsDisconnect: createAction('WEBSOCKET_DISCONNECT'),
//   onOpen: createAction('WEBSOCKET_OPEN'),
//   onClose: createAction('WEBSOCKET_CLOSE'),
//   onMessage: createAction<string>('WEBSOCKET_MESSAGE'),
//   onError: createAction<Error>('WEBSOCKET_ERROR'),
//   wsSendMessage: createAction<string>('SEND_WEBSOCKET_MESSAGE'),
//   // You can add other properties that are allowed by TwsActions,
//   // but adding an unknown property will result in the same error.
// };

// export const CONNECTION_START: 'CONNECTION_START' = 'CONNECTION_START';
// export const CONNECTION_CLOSE: 'CONNECTION_CLOSE' = 'CONNECTION_CLOSE';
// export const CONNECTION_CLOSED: 'CONNECTION_CLOSED' = 'CONNECTION_CLOSED';
// export const CONNECTION_ERROR: 'CONNECTION_ERROR' = 'CONNECTION_ERROR';
// export const CONNECTION_SUCCESS: 'CONNECTION_SUCCESS' = 'CONNECTION_SUCCESS';

// export const GET_MESSAGE: 'GET_MESSAGE' = 'GET_MESSAGE';
// export const SEND_MESSAGE: 'SEND_MESSAGE' = 'SEND_MESSAGE';

// // Define action types using createAction()
// export const wsConnecting = createAction<string, 'CONNECTION_START'>(CONNECTION_START);
// export const wsClosing = createAction<string, 'CONNECTION_CLOSE'>(CONNECTION_CLOSE);
// export const wsClosed = createAction<string, 'CONNECTION_CLOSED'>(CONNECTION_CLOSED);
// export const wsError = createAction<string, 'CONNECTION_ERROR'>(CONNECTION_ERROR);
// export const wsOpened = createAction<string, 'CONNECTION_SUCCESS'>(CONNECTION_SUCCESS);

// export const wsGetMessage = createAction<string, 'GET_MESSAGE'>(GET_MESSAGE);
// export const wsSendMessage = createAction<string, 'SEND_MESSAGE'>(SEND_MESSAGE);

// Create an object containing all the action types

const websocketMiddleware = createSocketMiddleware(wsActions)

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware)
  },
  // middleware: [thunk],
  // devTools: process.env.NODE_ENV !== 'production',
  devTools: true,
});

type TApplicationActions = AuthActionTypes
  | IngredientsActionsType
  | OrderActionTypes
  | RecipeActionTypes
  | TwsActions;

// export type RootState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<ReturnType, Action, RootState, TApplicationActions>>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>

// export const useDispatch = () => dispatchHook<AppDispatch>();
// export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;