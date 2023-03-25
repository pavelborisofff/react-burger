import { AppDispatch } from '..';
import { API } from '../../utils/constants';
import request from '../../utils/request';
import { getCookie, setCookie, deleteCookie } from '../../utils/cookie';


export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
export const TOKEN_ERROR = 'TOKEN_ERROR';

export const UPDATE_REQUEST = 'UPDATE_REQUEST';
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';
export const UPDATE_ERROR = 'UPDATE_ERROR';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_ERROR = 'USER_ERROR';

export const FORGOT_REQUEST = 'FORGOR_REQUEST';
export const FORGOT_SUCCESS = 'FORGOR_SUCCESS';
export const FORGOT_ERROR = 'FORGOR_ERROR';

export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const RESET_ERROR = 'RESET_ERROR';

export const CLEAR_ERROR = 'CLEAR_ERROR';


export interface ILoginForm {
  email: string,
  password: string
}

export interface IRegisterForm {
  name: string
  email: string,
  password: string,
}

interface ILoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string,
    name: string,
  },
  message?: string,
}


export const login = ({email, password}:ILoginForm) => async (dispatch: AppDispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response:ILoginResponse = await request({ endpoint: API.login, method: 'POST', data: { email, password } });
    
    if (!response.success) {
      dispatch({ type: LOGIN_ERROR });
      return;
    }

    setCookie('accessToken', response.accessToken);
    setCookie('refreshToken', response.refreshToken);
    dispatch({ 
      type: LOGIN_SUCCESS, 
      token: response.accessToken, 
      refreshToken: response.refreshToken,
      user: response.user,
    });
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, error: error });
  }
}

export const register = ({ email, password, name }:IRegisterForm) => async (dispatch: AppDispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const response:ILoginResponse = await request({ endpoint: API.register, method: 'POST', data: { email, password, name } });

    setCookie('accessToken', response.accessToken);
    setCookie('refreshToken', response.refreshToken);
    dispatch({ 
      type: REGISTER_SUCCESS, 
      token: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });
    return true;
  } catch (error) {
    dispatch({ type: REGISTER_ERROR, error: error });
    return false;
  }
};


interface IResponseLogout {
  success: boolean;
  message: string;
}


export const logout = () => async (dispatch: AppDispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const refreshToken = getCookie('refreshToken');
  const accessToken = getCookie('accessToken');

  try {
    const response:IResponseLogout = await request({ endpoint: API.logout, method: 'POST', data: { token: refreshToken } });

    deleteCookie('refreshToken');
    deleteCookie('accessToken');
    dispatch({ type: LOGOUT_SUCCESS, token: null, refreshToken: null, user: null });
  } catch (error) {
    console.log(error);
    dispatch({ type: LOGOUT_ERROR });
  }
};


interface ITokenResponse {
  success: boolean;
  accessToken: string,
  refreshToken: string,
}


export const tokenRefresh = () => async (dispatch: AppDispatch) => {
  dispatch({ type: TOKEN_REQUEST });
  const refreshToken = getCookie('refreshToken');

  try {  
    const response:ITokenResponse = await request({ endpoint: API.token, method: 'POST', data: { token: refreshToken } });

    setCookie('accessToken', response.accessToken);
    setCookie('refreshToken', response.refreshToken);
    dispatch({ type: TOKEN_SUCCESS, token: response.accessToken, refreshToken: response.refreshToken });
  } catch (error) {
    console.log(error);
    dispatch({ type: TOKEN_ERROR });
  }
}


export const updateUser = ({ email, password, name }:IRegisterForm) => async (dispatch: AppDispatch) => {
  dispatch({ type: UPDATE_REQUEST });
  const accessToken = getCookie('accessToken');
  const headers = { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };

  try {
    const response:ILoginResponse = await request({ endpoint: API.user, method: 'PATCH', data: { email, password, name }, headers: headers });

    setCookie('accessToken', response.accessToken);
    setCookie('refreshToken', response.refreshToken);
    dispatch({ 
      type: UPDATE_SUCCESS, 
      token: response.accessToken,
      refreshToken: response.refreshToken,
      user: response.user,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: UPDATE_ERROR });
  }
};


export const getUser = () => async (dispatch: AppDispatch) => {
  dispatch({ type: USER_REQUEST });
  const accessToken = getCookie('accessToken');
  const headers = { 
    'Content-Type': 'application/json', 
    'Accept': 'application/json',
    'Authorization': accessToken,
  }; 

  try {
    const response:ILoginResponse = await request({ endpoint: API.user, method: 'GET', headers: headers });
        
    dispatch({ 
      type: USER_SUCCESS, 
      user: response.user,
    });
  } catch (error: any) {
    if (error.message && (error.message === 'jwt expired' || error.message === 'jwt malformed')) {    
        
      try {
        dispatch(tokenRefresh());
        return null;
      }
      catch (error: any) {
        throw new Error (error);
      }
    }
    console.log(error);
    const message = error && error.message ? error.message : '';
    dispatch({ type: USER_ERROR, message: message });
  }
};


export interface IResetForm {
  password: string,
  token: string,
}

export const resetPassword = ({ password, token  }:IResetForm) => async (dispatch: AppDispatch) => {
  dispatch({ type: RESET_REQUEST });

  try {
    const response = await request({ endpoint: API.reset, method: 'POST', data: { password, token } });

    dispatch({ type: FORGOT_SUCCESS });
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, error: error });
  }
}

export const forgotPassword = (email: string) => async (dispatch: AppDispatch) => {
  dispatch({ type: FORGOT_REQUEST });

  try {
    await request({ endpoint: API.forgot, method: 'POST', data: { email } });

    dispatch({ type: FORGOT_SUCCESS });
  } catch (error) {
    dispatch({ type: FORGOT_ERROR, error: error });
  }
}