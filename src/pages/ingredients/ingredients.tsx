import cn from 'classnames';

import styles from  './ingredients.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services';
import { Data } from '../../types/types';
import { IngredientDetails } from '../../components/ingredients-details/ingredients';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredientsActions';
import useIngredients from '../../hooks/api';


const Ingredients = () => {
	const dispatch = useDispatch();
  const { id } = useParams();
  const { ingredientsRaw } = useSelector((store: RootState) => store.ingredients); 
  
  const data = ingredientsRaw?.find((item:Data) => item._id === id) as Data;

  useEffect(() => {
    if (!ingredientsRaw) {
      getIngredients();
    }
  }, [dispatch, ingredientsRaw]);

  return (
    <IngredientDetails {...data} />
  )
};

export default Ingredients;