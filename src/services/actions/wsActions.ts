import { ActionCreatorWithPayload, ActionCreatorWithoutPayload, createAction } from '@reduxjs/toolkit';
import { TWSResponse } from '../middleware/wsMiddleware';

export const CONNECTION_START: 'CONNECTION_START' = 'CONNECTION_START';
export const CONNECTION_STOP: 'CONNECTION_STOP' = 'CONNECTION_STOP';
export const CONNECTION_CLOSED: 'CONNECTION_CLOSED' = 'CONNECTION_CLOSED';
export const CONNECTION_ERROR: 'CONNECTION_ERROR' = 'CONNECTION_ERROR';
export const CONNECTION_SUCCESS: 'CONNECTION_SUCCESS' = 'CONNECTION_SUCCESS';

export const GET_MESSAGE: 'GET_MESSAGE' = 'GET_MESSAGE';
export const SEND_MESSAGE: 'SEND_MESSAGE' = 'SEND_MESSAGE';

export const wsStart = createAction<string, 'CONNECTION_START'>(CONNECTION_START);
export const wsStop = createAction(CONNECTION_STOP);
export const wsClosed = createAction(CONNECTION_CLOSED);
export const wsError = createAction<Event, 'CONNECTION_ERROR'>(CONNECTION_ERROR);
export const wsSuccess = createAction(CONNECTION_SUCCESS);

export const wsGetMessage = createAction<TWSResponse, 'GET_MESSAGE'>(GET_MESSAGE);
export const wsSendMessage = createAction<string, 'SEND_MESSAGE'>(SEND_MESSAGE);

// export interface FeedResponse {
//   success: boolean
//   orders: ReadonlyArray<Orders>
//   total: number
//   totalToday: number
// }

// export const wsActions = {
//   wsConnecting: wsConnecting,
//   wsClosing: wsClosing,
//   wsClosed: wsClosed,
//   wsError: wsError,
//   wsOpened: wsOpened,
//   wsGetMessage: wsGetMessage,
//   wsSendMessage: wsSendMessage,
// };

export type TwsActions = ReturnType<typeof wsStart 
                          | typeof wsStop
                          | typeof wsClosed 
                          | typeof wsError 
                          | typeof wsSuccess 
                          | typeof wsGetMessage 
                          | typeof wsSendMessage>;

// export type TwsActions = {
//   wsDisconnect: ActionCreatorWithoutPayload<'WEBSOCKET_DISCONNECT'>;
//   onOpen: ActionCreatorWithoutPayload<'WEBSOCKET_OPEN'>;
//   onClose: ActionCreatorWithoutPayload<'WEBSOCKET_CLOSE'>;
//   onMessage: ActionCreatorWithPayload<string, 'WEBSOCKET_MESSAGE'>;
//   onError: ActionCreatorWithPayload<Error, 'WEBSOCKET_ERROR'>;
//   wsSendMessage: ActionCreatorWithPayload<string, 'SEND_WEBSOCKET_MESSAGE'>;
//   // Add any other required properties if needed
// };