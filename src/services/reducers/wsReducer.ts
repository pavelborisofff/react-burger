import { TwsActions } from "../actions/wsActions";
import { TOrderType, TWsActionTypes } from "../middleware/wsMiddleware";


export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

interface IWsState {
  status: 'CONNECTING' | 'ONLINE' | 'OFFLINE';
  error: string;
  orders: TOrderType[];
  total: number;
  totalToday: number;
}

const initialState: IWsState = {
  status: WebsocketStatus.OFFLINE,
  error: '',
  orders: [],
  total: 0,
  totalToday: 0,
}

const wsReducer = (state = initialState, action: TwsActions): IWsState => {
  switch (action.type) {
    case 'FEED_WS_CONNECTING':
      return {
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case 'FEED_WS_OPEN':
      return {
        ...state,
        status: WebsocketStatus.ONLINE,
        error: '',
      };
    case 'FEED_WS_CLOSE':
      return {
        ...state,
        status: WebsocketStatus.OFFLINE,
        // error: '',
        // orders: [],
        // total: 0,
        // totalToday: 0,
      };
    case 'FEED_WS_MESSAGE':
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case 'FEED_WS_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state;
  };
};

export default wsReducer;