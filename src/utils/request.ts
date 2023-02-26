import axios from 'axios';

import { API, API_URL } from './constants';
import { AnyCnameRecord } from 'dns';


interface IRequest {
  readonly endpoint: keyof typeof API;
  readonly baseUrl?: string;
  readonly method?: string;
  readonly data?: {};
}


async function request({endpoint, baseUrl = API_URL, method = 'GET', data}:IRequest) {
  const requestOptions = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    data: data,
  };
  
  return await axios(baseUrl + endpoint, requestOptions)
    .then(response => response.data)
    .catch(error => {
      throw new Error(`Request failed: ${error}, Status: ${error.response.status}`);
    }
  );
};

export default request;
