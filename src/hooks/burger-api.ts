import { useState } from "react";

import axios from "axios";

import { API_URL, API } from "../utils/constants";
import { Data, FilteredData, Payload } from "../types/types";

enum Method {
  GET = "get",
  POST = "post",
}

enum Requests {
  getData = "getData",
  postOrder = "postOrder",
}

type typeState = {
  isLoading: boolean;
  isError: boolean;
};


type typeGetResponse = {
  data: Data[],
  sucess: string
}

type typePostOrder = {
  name: string,
  order: {
    number: number
  },
  success: string
}


const BurgerApi = () => {
  const [state, setState] = useState<typeState>({
    isLoading: false,
    isError: false
  });

  const filterData = (data: Data[]) => {
    const filteredData = {} as FilteredData;

    data.forEach((item: Data) => {
      const key = item.type;

      if (!filteredData[item.type]) filteredData[key] = [];
      filteredData[key]?.push(item);
    });

    return filteredData;
  };

  const makeRequest = async (
    request: Requests = Requests.getData,
    payload?: Payload,
    url: string = API_URL
  ) => {
    setState({ ...state, isLoading: true });

    try {
      let result;
      
      switch (request) {
        case Requests.getData:
          result = await axios<typeGetResponse>(url + API.ingredients, { method: Method.GET });
          setState({ ...state, isLoading: false });
          return filterData(result.data.data);
          
        case Requests.postOrder:
          result = await axios<typePostOrder>(url + API.orders, {
            method: Method.POST,
            data: payload,
          });
          setState({ ...state, isLoading: false });
          return result.data.order.number as number;
        default:
          throw new Error('Unknown method');
      }
    } catch (error) {
      setState({ ...state, isLoading: false, isError: true });
    }
  };

  return { ...state, makeRequest };
};

export { BurgerApi, Requests };
