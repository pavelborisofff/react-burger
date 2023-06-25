import recipeReducer from './recipeReducer';


const initialState = {
  usedIngredients: [],
  bun: null,
  payload: null,
  bill: 0,
  usedCount: {},
};

const ingredient = {
  _id: '1',
  name: 'Test Ingredient',
  type: 'test',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 10,
  image: '',
  image_mobile: '',
  image_large: '',
  __v: 0,
};

describe('recipeReducer', () => {
  it('should return the initial state', () => {
    expect(recipeReducer(undefined, {})).toEqual(initialState);
  })

  it('should handle INGREDIENT_ADD', () => {
    const action = { type: 'INGREDIENT_ADD', payload: ingredient };
    const newState = recipeReducer(initialState, action);
    expect(newState.usedIngredients).toContainEqual(ingredient);
    expect(newState.usedCount[ingredient._id]).toBe(1);
    expect(newState.bill).toBe(10);
  })

  it('should handle INGREDIENT_REMOVE', () => {
    const state = {
      ...initialState,
      usedIngredients: [ingredient],
      usedCount: { '1': 1 },
      bill: 10,
    };

    const action = { type: 'INGREDIENT_REMOVE', payload: ingredient };
    const newState = recipeReducer(state, action);
    expect(newState.usedIngredients).not.toContainEqual(ingredient);
    expect(newState.usedCount[ingredient._id]).toBe(0);
    expect(newState.bill).toBe(0);
  })

  it('should handle BUN_ADD', () => {
    const action = { type: 'BUN_ADD', payload: ingredient };
    const newState = recipeReducer(initialState, action);
    expect(newState.bun).toEqual(ingredient);
    expect(newState.bill).toBe(20);
  })

  it('should handle BUN_REMOVE', () => {
    const action = { type: 'BUN_REMOVE' };
    const newState = recipeReducer(initialState, action);
    expect(newState.bun).toBe(null);
    expect(newState.bill).toBe(0);
  })

  it('should handle INGREDIENTS_SET', () => {
    const action = { type: 'INGREDIENTS_SET', payload: [ingredient] };
    const newState = recipeReducer(initialState, action);
    expect(newState.usedIngredients).toContainEqual(ingredient);
  })

  it('should handle INGREDIENTS_RESET', () => {
    const action = { type: 'INGREDIENTS_RESET' };
    const newState = recipeReducer(initialState, action);
    expect(newState.usedIngredients).toEqual([]);
  })
})