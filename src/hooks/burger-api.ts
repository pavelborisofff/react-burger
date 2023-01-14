import { useState, useEffect } from 'react';
import axios from 'axios';
import { DataUrl } from '../utils/constants';
import { GetData } from '../utils/types';


const useGetData = (dataUrl: string = DataUrl) => {
  const [state, setState] = useState<GetData>({
    isLoading: false,
    isError: false,
    data: [],
  });

  useEffect(() => {  
    getData();
  // eslint-disable-next-line
  }, []);

  const getData = async () => {
    setState({ ...state, isLoading: true });

    try {
      const result = await axios(DataUrl);
      setState({ ...state, isLoading: false, data: result.data.data });      
    } catch (error) {
      setState({ ...state, isLoading: false, isError: true });
    }
  };

  return state;
}

export { useGetData };