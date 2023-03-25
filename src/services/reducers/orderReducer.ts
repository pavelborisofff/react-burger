import {
  ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_ERROR,
  ORDER_RESET
} from '../actions/orderActions';


interface IOrderState {
  orderNumber: any;
  name: string;
  isLoading: boolean;
  isError: boolean;
}

const initialOrder:IOrderState = {
  orderNumber: null,
  name: '',
  isLoading: false,
  isError: false
};

const orderReducer = (state = initialOrder, action: any) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        orderNumber: action.orderNumber,
        name: action.name,
        isLoading: false,
        isError: false
      };
    case ORDER_REQUEST_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case ORDER_RESET:
      return {
        ...state,
        orderNumber: null,
        name: '',
        isLoading: false,
        isError: false
      };
    default:
      return state;
  }
};
  

export default orderReducer;