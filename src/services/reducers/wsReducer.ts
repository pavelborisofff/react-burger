import { Data } from "../../types/types";
import { TwsActions } from "../actions/wsActions";
import { TOrderType } from "../middleware/wsMiddleware";


export enum WebsocketStatus {
  CONNECTING = 'CONNECTING',
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE'
}

interface IWsState {
  status: 'CONNECTING' | 'ONLINE' | 'OFFLINE';
  error: string;
  orders: TOrderType[];
  preparedOrders: TPreparedOrder[];
  total: number;
  totalToday: number;
}

type TPreparedOrder = {
  ingredients: Data[];
  _id: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  price: number;
}

const initialState: IWsState = {
  status: WebsocketStatus.OFFLINE,
  error: '',
  orders: [],
  preparedOrders: [],
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