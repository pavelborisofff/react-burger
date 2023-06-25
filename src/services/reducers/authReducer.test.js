import authReducer from './authReducer';


const initialState = {
  user: { email: '', name: '', password: ''},
  token: '',
  refreshToken: '',
  isAuth: false,
  isLoading: false,
  isError: false,
  isForgot: false,
  message: '',
};

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  })

  it('should  handle LOGIN_REQUEST', () => {
    const action = { type: 'LOGIN_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = { type: 'LOGIN_SUCCESS', user: { email: 'email', name: 'name' }, token: 'token', refreshToken: 'refreshToken' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(true);
    expect(newState.user.email).toBe('email');
    expect(newState.user.name).toBe('name');
    expect(newState.token).toBe('token');
    expect(newState.refreshToken).toBe('refreshToken');
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle LOGIN_ERROR', () => {
    const action = { type: 'LOGIN_ERROR', message: 'error' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.message).toBe('error');
  })

  it('should handle REGISTER_REQUEST', () => {
    const action = { type: 'REGISTER_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle REGISTER_SUCCESS', () => {
    const action = { type: 'REGISTER_SUCCESS', user: { email: 'email', name: 'name' }, token: 'token', refreshToken: 'refreshToken' };
    const newState = authReducer(initialState, action);
    expect(newState.user.email).toBe('email');
    expect(newState.user.name).toBe('name');
    expect(newState.token).toBe('token');
    expect(newState.refreshToken).toBe('refreshToken');
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle REGISTER_ERROR', () => {
    const action = { type: 'REGISTER_ERROR', message: 'error' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.message).toBe('error');
  })

  it('should handle LOGOUT_REQUEST', () => {
    const action = { type: 'LOGOUT_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle LOGOUT_SUCCESS', () => {
    const action = { type: 'LOGOUT_SUCCESS' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle LOGOUT_ERROR', () => {
    const action = { type: 'LOGOUT_ERROR', message: 'error' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.message).toBe('error');
  })

  it('should handle TOKEN_REQUEST', () => {
    const action = { type: 'TOKEN_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle TOKEN_SUCCESS', () => {
    const action = { type: 'TOKEN_SUCCESS', token: 'token' };
    const newState = authReducer(initialState, action);
    expect(newState.token).toBe('token');
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle TOKEN_ERROR', () => {
    const action = { type: 'TOKEN_ERROR', message: 'error' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.message).toBe('error');
  })

  it('should handle UPDATE_REQUEST', () => {
    const action = { type: 'UPDATE_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  });

  it('should handle UPDATE_SUCCESS', () => {
    const action = { type: 'UPDATE_SUCCESS', user: { email: 'email', name: 'name' }};
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle UPDATE_ERROR', () => {
    const action = { type: 'UPDATE_ERROR', message: 'error' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.message).toBe('error');
  })

  it('should handle USER_REQUEST', () => {
    const action = { type: 'USER_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(true);
    expect(newState.isError).toBe(false);
  });

  it('should handle USER_SUCCESS', () => {
    const action = { type: 'USER_SUCCESS', user: { email: 'email', name: 'name' }};
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(true);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle USER_ERROR', () => {
    const action = { type: 'USER_ERROR', message: 'error' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(true);
    expect(newState.message).toBe('error');
  })

  it('should handle FORGOT_REQUEST', () => {
    const action = { type: 'FORGOT_REQUEST' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  });

  it('should handle FORGOT_SUCCESS', () => {
    const action = { type: 'FORGOT_SUCCESS' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })

  it('should handle FORGOT_ERROR', () => {
    const action = { type: 'FORGOT_ERROR' };
    const newState = authReducer(initialState, action);
    expect(newState.isAuth).toBe(false);
    expect(newState.isLoading).toBe(false);
    expect(newState.isForgot).toBe(false);
  })

  it('should handle CLEAR_ERROR', () => {
    const action = { type: 'CLEAR_ERROR' };
    const newState = authReducer(initialState, action);
    expect(newState.isError).toBe(false);
    expect(newState.message).toBe('');
  })
})