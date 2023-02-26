import { Data } from '../../types/types';
import { API, Tabs } from '../../utils/constants';
import request from '../../utils/request';

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_REQUEST_SUCCESS = 'INGREDIENTS_REQUEST_SUCCESS';
export const INGREDIENTS_REQUEST_ERROR = 'INGREDIENTS_REQUEST_ERROR';


// type typeName = keyof typeof Tabs;

// type PreparedData = {
//   [key in typeName]?: Data[];
// };

export interface IPreparedData extends Partial<Record<Tabs, Data[]>> {}

interface IIngredients {
  type: string;
  ingredients?: IPreparedData;
}

interface IIngredientsResponse {
  success: boolean;
  data: Data[];
}

/**
 * 
 * @param arr IIngredientsResponse like {success: true, data: [{_id: ..., name: ..., type: ..., ...}, ...]}
 * @returns IPreparedData like {bun: [{_id: ..., name: ..., type: ..., ...}, ...], ...} where key in Tabs enum keys (keyof typeof Tabs)
 */
function sortByTypes (arr: IIngredientsResponse):IPreparedData {
  const result = {} as IPreparedData;

  arr.data.forEach((item: Data) => {
    const key = item.type;

    if (!result[item.type]) result[key] = [];
    result[key]?.push(item);
  });
  
  return result;
}


export const getIngredients = () => async (dispatchFunc: ({type}:IIngredients) => void) => {
  dispatchFunc({type: INGREDIENTS_REQUEST});

  try {
    const response:IIngredientsResponse = await request({endpoint: API.ingredients});
    const preparedData:IPreparedData = sortByTypes(response);
    dispatchFunc({type: INGREDIENTS_REQUEST_SUCCESS,ingredients: preparedData});
  } catch (error) {
    console.log(error);
    dispatchFunc({type: INGREDIENTS_REQUEST_ERROR});
  }
}
