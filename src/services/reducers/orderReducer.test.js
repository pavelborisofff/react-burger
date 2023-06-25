import orderReducer from './orderReducer';


const initialState = {
  orderNumber: null,
  name: '',
  isLoading: false,
  isError: false
};

describe('orderReducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {})).toEqual(initialState);
  })

  it('should handle ORDER_REQUEST', () => {
    const action = { type: 'ORDER_REQUEST' };
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
  })

  it('should handle ORDER_REQUEST_SUCCESS', () => {
    const action = { type: 'ORDER_REQUEST_SUCCESS' };
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
  })

  it('should handle ORDER_REQUEST_ERROR', () => {
    const action = { type: 'ORDER_REQUEST_ERROR' };
    const newState = orderReducer(initialState, action);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
  })

  it('should handle ORDER_RESET', () => {
    const action = { type: 'ORDER_RESET' };
    const newState = orderReducer(initialState, action);
    expect(newState.orderNumber).toBe(null);
    expect(newState.name).toBe('');
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
  })
});