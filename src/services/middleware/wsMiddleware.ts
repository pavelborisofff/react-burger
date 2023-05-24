import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { RootState } from '../index';


export type TOrderType = {
  ingredients: Array<string>;
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
};


export type TWsActionTypes = {
  wsStart: ActionCreatorWithPayload<string>;
  wsStop: ActionCreatorWithoutPayload;
  wsClosed: ActionCreatorWithoutPayload;
  wsError: ActionCreatorWithPayload<string>;
  wsSuccess: ActionCreatorWithoutPayload;

  wsGetMessage: ActionCreatorWithPayload<TWSResponse>;
  wsSendMessage?: ActionCreatorWithPayload<string>;
};

export type TWSResponse = {
  success: boolean;
  orders: Array<TOrderType>;
  total: number;
  totalToday: number;
  name: string;
};



export const createSocketMiddleware = 
  (wsActions: TWsActionTypes): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected: boolean = false;

    return (next) => (action) => {
      const { dispatch } = store;
      const { payload } = action;
      const {
        wsStart,
        wsStop,
        wsClosed,
        wsError,
        wsSuccess,
        wsGetMessage,
        wsSendMessage,
      } = wsActions;

      if (wsStart.match(action)) {
        socket = new WebSocket(`${action.payload}`);
        isConnected = true;
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsSuccess());
        };

        socket.onerror = (event) => {
          dispatch(wsError('error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData: TWSResponse = JSON.parse(data);
          dispatch(wsGetMessage(parsedData));
        };

        socket.onclose = (event) => {
          dispatch(wsStop());
        };

        if (wsSendMessage?.match(action)) {
          const message = { ...payload };
          socket.send(JSON.stringify(message));
        }

        if (wsClosed.match(action)) {
          socket.close();
          socket = null;
          isConnected = false;
          dispatch(wsClosed())
        }
      }
      next(action);
    };
  };
};
