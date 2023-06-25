import axios from 'axios';

import { API, API_URL } from './constants';


interface IRequest {
  endpoint: API;
  baseUrl?: string;
  method?: string;
  data?: {};
  headers?: {};
}


async function request({endpoint, baseUrl = API_URL, method = 'GET', data, headers}:IRequest) {
  const requestOptions = {
    method: method,
    headers: headers || { 'Content-Type': 'application/json' },
    data: data,
  };

  return await axios(baseUrl + endpoint, requestOptions)
    .then(response => response.data)
    .catch(error => {
      const msg:string = error.response.data.message || error.message || error.toString();
      throw new Error( msg );
    }
  );
};


export default request;
