import { AnyAction } from 'redux';
import { Data } from '../../types/types';
import { API } from '../../utils/constants';
import request from '../../utils/request';

export const ORDER_REQUEST = "ORDER_REQUEST";
export const ORDER_REQUEST_SUCCESS = "ORDER_REQUEST_SUCCESS";
export const ORDER_REQUEST_ERROR = "ORDER_REQUEST_ERROR";
export const ORDER_RESET = "ORDER_RESET";


export type Payload = {
  ingredients: string[];
};

export const orderPost = (data?: Payload) => async (dispatchFunc: any) => {

  dispatchFunc({ type: ORDER_REQUEST });
  console.log('body', data);

  try {
    const response = await request({ endpoint: API.orders, method: "POST", data: data});
    console.log('response', response);
    dispatchFunc({ type: ORDER_REQUEST_SUCCESS, orderNumber: response.order.number, name: response.name });
  } catch (error) {
    console.log(error);
    dispatchFunc({ type: ORDER_REQUEST_ERROR });
  }
};