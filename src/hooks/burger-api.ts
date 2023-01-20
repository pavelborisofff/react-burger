import { useState } from "react";

import axios from "axios";

import { ApiUrl, API } from "../utils/constants";
import { Data, FilteredData, Payload } from "../types/types";

enum Method {
  GET = "get",
  POST = "post",
}

enum Requests {
  getData = "getData",
  postOrder = "postOrder",
}

const BurgerApi = () => {
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    response: null,
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
    url: string = ApiUrl
  ) => {
    setState({ ...state, isLoading: true });

    try {
      let result;

      switch (request) {
        case Requests.getData:
          result = await axios(url + API.ingredients, { method: Method.GET });
          setState({ ...state, isLoading: false });
          return filterData(result.data.data);
        case Requests.postOrder:
          result = await axios(url + API.orders, {
            method: Method.POST,
            data: payload,
          });

          setState({ ...state, isLoading: false });
          return result.data.order.number;
        default:
          throw new Error("Unknown method");
      }
    } catch (error) {
      setState({ ...state, isLoading: false, isError: true });
    }
  };

  return { ...state, makeRequest };
};

export { BurgerApi, Requests };
