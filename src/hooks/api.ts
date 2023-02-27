import { useDispatch } from 'react-redux';

import { getIngredients } from '../services/actions/ingredientsActions';
import { useEffect } from 'react';


const useIngredients = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients() as any);  // TODO: https://redux.js.org/usage/usage-with-typescript#define-typed-hooks  — ещё не вчитался и не вник, как это сделать правильно
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // TODO: we need call this function only once at the beginning
}

export default useIngredients;