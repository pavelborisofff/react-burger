import { getIngredients } from '../services/actions/ingredientsActions';
import { useEffect } from 'react';
import { connect, disconnect } from '../services/actions/wsActions';
import { WS_API } from '../utils/constants';
import { useDispatch } from '../services';


const useIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

const useOrders = (url: string = WS_API.all, token?: boolean) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect({ url, token }));

    return () => {
      dispatch(disconnect());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useIngredients, useOrders };
