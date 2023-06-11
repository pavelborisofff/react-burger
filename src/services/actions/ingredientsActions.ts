import { AppDispatch } from '..';
import { Data } from '../../types/types';
import { API, Tabs } from '../../utils/constants';
import request from '../../utils/request';

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_REQUEST_SUCCESS = 'INGREDIENTS_REQUEST_SUCCESS';
export const INGREDIENTS_REQUEST_ERROR = 'INGREDIENTS_REQUEST_ERROR';


export type IngredientsActionsType = 
  | {type: typeof INGREDIENTS_REQUEST}
  | {type: typeof INGREDIENTS_REQUEST_SUCCESS, ingredients: IPreparedData, ingredientsRaw: Data[]}
  | {type: typeof INGREDIENTS_REQUEST_ERROR};

export interface IPreparedData extends Partial<Record<Tabs, Data[]>> {}


interface IIngredientsResponse {
  success: boolean;
  data: Data[];
}


function sortByTypes (arr: IIngredientsResponse):IPreparedData {
  const result = {} as IPreparedData;

  arr.data.forEach((item: Data) => {
    const key = item.type;

    if (!result[item.type]) result[key] = [];
    result[key]?.push(item);
  });
  
  return result;
}


export const getIngredients = () => async (dispatch: AppDispatch) => {
  dispatch({type: INGREDIENTS_REQUEST});

  try {
    const response:IIngredientsResponse = await request({endpoint: API.ingredients});
    const preparedData:IPreparedData = sortByTypes(response);
    dispatch({
      type: INGREDIENTS_REQUEST_SUCCESS, 
      ingredients: preparedData,
      ingredientsRaw: response.data
    });
  } catch (error) {
    dispatch({type: INGREDIENTS_REQUEST_ERROR});
  }
}
