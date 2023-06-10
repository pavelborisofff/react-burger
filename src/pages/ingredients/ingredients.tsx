import { RootState, useDispatch, useSelector } from '../../services';
import { Data } from '../../types/types';
import { IngredientDetails } from '../../components/ingredients-details/ingredients';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredientsActions';


const Ingredients = () => {
	const dispatch = useDispatch();
  const location = useLocation();
  let { id } = useParams();
  const { ingredientsRaw } = useSelector((store: RootState) => store.ingredients); 
  
  if (!id) {
    id = location.state.id;
  } 
  
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