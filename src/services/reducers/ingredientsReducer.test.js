import ingredientsReducer from './ingredientsReducer';


const initialState = {
  ingredients: null,
  isLoading: false,
  isError: false,
};


describe('ingredientsReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {})).toEqual(initialState);
  })

  it('should handle INGREDIENTS_REQUEST', () => {
    const action = { type: 'INGREDIENTS_REQUEST' };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
  })

  it('should handle INGREDIENTS_REQUEST_SUCCESS', () => {
    const ingredients = {data: []};
    const ingredientsRaw = [];
    const newState = ingredientsReducer(initialState, {type: 'INGREDIENTS_REQUEST_SUCCESS', ingredients, ingredientsRaw});
    expect(newState.ingredients).toEqual(ingredients);
    expect(newState.ingredientsRaw).toEqual(ingredientsRaw);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
  })

  it('should handle INGREDIENTS_REQUEST_ERROR', () => {
    const action = { type: 'INGREDIENTS_REQUEST_ERROR' };
    const newState = ingredientsReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
  })
})