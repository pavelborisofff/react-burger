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

const useOrders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect({url: WS_API.orders}));

    return () => {
      dispatch(disconnect());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useIngredients, useOrders };
