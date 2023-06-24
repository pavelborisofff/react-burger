import { createAction } from '@reduxjs/toolkit';
import { TWSResponse } from '../middleware/wsMiddleware';


export const connect = createAction<{ url: string, token?: boolean }, 'FEED_CONNECT'>('FEED_CONNECT');
export const disconnect = createAction('FEED_DISCONNECT');
export const wsConnecting = createAction('FEED_WS_CONNECTING');
export const wsOpen = createAction('FEED_WS_OPEN');
export const wsClose = createAction('FEED_WS_CLOSE');
export const wsMessage = createAction<TWSResponse, 'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE');
export const wsOrders = createAction<TWSResponse, 'FEED_WS_ORDERS'>('FEED_WS_ORDERS');
export const wsError = createAction<string, 'FEED_WS_ERROR'>('FEED_WS_ERROR');

export type TwsActions = ReturnType<typeof connect 
                          | typeof disconnect
                          | typeof wsConnecting 
                          | typeof wsOpen 
                          | typeof wsClose 
                          | typeof wsMessage
                          | typeof wsOrders
                          | typeof wsError>;

// export type TwsActions = 
//   | { type: typeof connect }
//   | { type: typeof disconnect }
//   | { type: typeof wsConnecting }
//   | { type: typeof wsOpen }
//   | { type: typeof wsClose }
//   | { type: typeof wsMessage }
//   | { type: typeof wsError };
