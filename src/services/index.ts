import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import rootReducer from './reducers/rootReducer';


import {
  connect as LiveFeedWsConnect,
  disconnect as LiveFeedWsDisconnect,
  wsConnecting as LiveFeedWsConnecting,
  wsOpen as LiveFeedWsOpen,
  wsClose as LiveFeedWsClose,
  wsMessage as LiveFeedWsMessage,
  wsError as LiveFeedWsError,
} from'./actions/wsActions';

import { createSocketMiddleware } from './middleware/wsMiddleware';


const wsActions = {
  connect: LiveFeedWsConnect,
  disconnect: LiveFeedWsDisconnect,
  wsConnecting: LiveFeedWsConnecting,
  wsOpen: LiveFeedWsOpen,
  wsClose: LiveFeedWsClose,
  wsMessage: LiveFeedWsMessage,
  wsError: LiveFeedWsError,
};

const websocketMiddleware = createSocketMiddleware(wsActions);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(websocketMiddleware);
  },
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;