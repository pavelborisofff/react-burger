import { useState, useEffect, useContext } from 'react';

import axios from 'axios';

import { ApiUrl, API } from '../utils/constants';
import { GetData, Data, FilteredData, PostData, Payload } from '../utils/types';
import { OrderContext } from '../contexts/constructor-context';



const useGetData = (dataUrl: string = ApiUrl) => {
  const [state, setState] = useState<GetData>({
    isLoading: false,
    isError: false,
    data: {} as FilteredData,
  });

  useEffect(() => {  
    getData();
  // eslint-disable-next-line
  }, []);

  const filterData = (data: Data[]) => {
    const filteredData = {} as FilteredData;

    data.forEach((item: Data) => {
      const key = item.type;

      if (!filteredData[item.type]) filteredData[key] = [];
      filteredData[key]?.push(item);
    });
    
    return filteredData;
  };


  const getData = async () => {
    setState({ ...state, isLoading: true });

    try {
      const result = await axios(ApiUrl + API.ingredients);
      setState({ ...state, isLoading: false, data: filterData(result.data.data) });      
    } catch (error) {
      setState({ ...state, isLoading: false, isError: true });
    }
  };

  return state;
};

const usePostOrder = (dataUrl: string = ApiUrl) => {
  const [state, setState] = useState<PostData>({
    isLoading: false,
    isError: false,
    response: null,
  });
  const [payload, setPayload] = useState<Payload | null>(null);
  const { setNumber } = useContext(OrderContext);

  const postData = async (data: any) => {
    setState({ ...state, isLoading: true });

    try {
      setNumber(0);
      const result = await axios.post(dataUrl + API.orders, data);
      
      setState({ ...state, isLoading: false, response: result.data })
      setNumber(result.data.order.number);
      setPayload(null);
    } catch (error) {
      setState({ ...state, isLoading: false, isError: true });
    }
  }

  useEffect(() => {
    if (payload) postData(payload);    
  // eslint-disable-next-line
  }, [payload]);

  return { setPayload };
};

export { useGetData, usePostOrder };