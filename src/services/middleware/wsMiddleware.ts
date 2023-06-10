import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';

import { Middleware, MiddlewareAPI } from 'redux';
import { AppDispatch, RootState } from '../index';
import { TwsActions } from '../actions/wsActions';
import { getCookie, setCookie } from '../../utils/cookie';
import { tokenRefresh } from '../actions/authActions';
import { Data } from '../../types/types';


export type TOrderType = {
  ingredients: Array<string | Data | undefined>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};


export type TWsActionTypes = {
  connect: ActionCreatorWithPayload<{ url: string, token?: boolean }>;
  disconnect: ActionCreatorWithoutPayload;
  wsConnecting: ActionCreatorWithoutPayload;
  wsOpen: ActionCreatorWithoutPayload;
  wsClose: ActionCreatorWithoutPayload;
  wsMessage: ActionCreatorWithPayload<TWSResponse>;
  wsError: ActionCreatorWithPayload<string>; 
}


export type TWSResponse = {
  success: boolean;
  orders: Array<TOrderType>;
  total: number;
  totalToday: number;
  message: string;
};


export const createSocketMiddleware = (wsActions: TWsActionTypes): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    let url = '';
    let token = '';
    let isConnected: boolean = false;
    let reconnectTimer = 0;

    return (next) => (action: TwsActions) => {
      const { dispatch } = store;
      const {
        connect,
        disconnect,
        wsConnecting,
        wsOpen,
        wsClose,
        wsMessage,
        wsError,
      } = wsActions;

      if (connect.match(action)) {
        console.log('Websocket connecting:' + action.payload.url);
        url = action.payload.url;
        token = action.payload.token ? `?token=${getCookie('accessToken')?.replace('Bearer ', '')}` : "";
        socket = new WebSocket(url + token);
        console.log('token:', token);
        console.log('wurl:', url);
        console.log('SOCKET:', socket);
        isConnected = true;
        window.clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        dispatch(wsConnecting())
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsOpen());
        };

        socket.onerror = () => {
          dispatch(wsError('Websocket error'));
        };

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event;
          const parsedData: TWSResponse = JSON.parse(data);

          if (parsedData.message === 'Invalid or missing token') {
            setCookie('accessToken', '', { expires: -1 });
            dispatch(tokenRefresh());

            return;
          }

          dispatch(wsMessage(parsedData));
        };

        socket.onclose = (event: CloseEvent) => {
          if (event.code !== 1000) {
            dispatch(wsError(event.code.toString()));
          }

          if (isConnected) {
            dispatch(wsConnecting());

            reconnectTimer = window.setTimeout(() => {
              dispatch(connect({ url, token: !!token }));
            }, 5000);
          }
        };
      }

      if (socket && disconnect.match(action)) {
        window.clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        dispatch(wsClose());
        socket.close();
      }

      next(action);
    };
  };
};
