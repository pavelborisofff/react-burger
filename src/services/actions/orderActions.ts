import { AppDispatch } from '..';
import { API } from '../../utils/constants';
import { getCookie } from '../../utils/cookie';
import request from '../../utils/request';
import { tokenRefresh } from './authActions';
import { INGREDIENTS_RESET } from './recipeActions';

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_REQUEST_SUCCESS = "ORDER_REQUEST_SUCCESS";
export const ORDER_REQUEST_ERROR = "ORDER_REQUEST_ERROR";
export const ORDER_RESET = "ORDER_RESET";


export type Payload = {
  ingredients: string[];
};

export type OrderActionTypes =
  | { type: typeof ORDER_REQUEST }
  | { type: typeof ORDER_REQUEST_SUCCESS; orderNumber: number; name: string }
  | { type: typeof ORDER_REQUEST_ERROR }
  | { type: typeof ORDER_RESET };


export const orderPost = (data?: Payload) => async (dispatch: AppDispatch) => {
  dispatch({ type: ORDER_REQUEST });

  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    throw new Error('Access token not found');
  }

  const headers = { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Authorization': `${accessToken}`,
  };


  try {   
    const response = await request({ endpoint: API.orders, method: 'POST', data, headers});
    dispatch({ type: ORDER_REQUEST_SUCCESS, orderNumber: response.order.number, name: response.name })
    dispatch({ type: INGREDIENTS_RESET });
  } catch (error) {
    if (error instanceof Error && error.message === 'jwt expired') {
      await dispatch(tokenRefresh());

      const response = await request({ endpoint: API.orders, method: 'POST', data, headers});
      dispatch({ type: ORDER_REQUEST_SUCCESS, orderNumber: response.order.number, name: response.name })
      dispatch({ type: INGREDIENTS_RESET });
    }

    dispatch({ type: ORDER_REQUEST_ERROR });
  }
};