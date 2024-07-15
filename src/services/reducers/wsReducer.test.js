import wsReducer, { WebsocketStatus } from './wsReducer';


const initialState = {
  status: WebsocketStatus.OFFLINE,
  error: '',
  orders: [],
  preparedOrders: [],
  total: 0,
  totalToday: 0,
}

describe('wsReducer', () => {
  it('should return the initial state', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FEED_WS_CONNECTING', () => {
    const action = {
      type: 'FEED_WS_CONNECTING',
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      status: WebsocketStatus.CONNECTING,
    });
  })

  it('should handle FEED_WS_OPEN', () => {
    const action = {
      type: 'FEED_WS_OPEN',
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      status: WebsocketStatus.ONLINE,
      error: '',
    });
  })

  it('should handle FEED_WS_CLOSE', () => {
    const action = {
      type: 'FEED_WS_CLOSE',
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      status: WebsocketStatus.OFFLINE,
    });
  })

  it('should handle FEED_WS_MESSAGE', () => {
    const orders = [{ id: 1 }, { id: 2 }];
    const action = {
      type: 'FEED_WS_MESSAGE',
      payload: {
        orders,
        total: 10,
        totalToday: 5,
      },
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      orders,
      total: 10,
      totalToday: 5,
    });
  })

  it('should handle FEED_WS_ERROR', () => {
    const action = {
      type: 'FEED_WS_ERROR',
      payload: 'error',
    };
    expect(wsReducer(initialState, action)).toEqual({
      ...initialState,
      error: 'error',
    });
  })
});
