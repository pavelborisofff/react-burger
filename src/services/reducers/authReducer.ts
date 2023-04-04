import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  
  TOKEN_REQUEST,
  TOKEN_SUCCESS,
  TOKEN_ERROR,

  UPDATE_REQUEST,
  UPDATE_SUCCESS,
  UPDATE_ERROR,

  USER_REQUEST,
  USER_SUCCESS,
  USER_ERROR,

  CLEAR_ERROR,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_ERROR,
  AuthActionTypes,
} from '../actions/authActions';


export interface IAuthState {
  user: {
    email: string | null,
    name: string | null,
    password?: string | null,
  };
  token: string,
  refreshToken: string,
  isAuth: boolean,
  isLoading: boolean,
  isError: boolean,
  isForgot: boolean,
  message?: string,
}

const initialState:IAuthState = {
  user: { email: '', name: '', password: ''},
  token: '',
  refreshToken: '',
  isAuth: false,
  isLoading: false,
  isError: false,
  isForgot: false,
  message: '',
};


const authReducer = (state = initialState, action: AuthActionTypes):IAuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isAuth: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        token: action.token,
        refreshToken: action.refreshToken,
        isAuth: true,
        isLoading: false,
        isError: false,
        message: '',
      };
    case LOGIN_ERROR:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case REGISTER_REQUEST:
      return {
        ...state,
        isAuth: false,
        isLoading: true,
        isError: false,
        message: '',
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        token: action.token,
        refreshToken: action.refreshToken,
        isLoading: false,
        isError: false,
        message: '',
      };
    case REGISTER_ERROR:      
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case LOGOUT_SUCCESS:
      return {
        ...initialState,
      };
    case LOGOUT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case TOKEN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case TOKEN_SUCCESS:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
        isLoading: false,
        isError: false,
        isAuth: true,
        message: '',
      };
    case TOKEN_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        isLoading: false,
        isError: false,
        message: '',
      };
    case UPDATE_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
      };
    case USER_SUCCESS:
      return {
        ...state,
        user: { email: action.user.email, name: action.user.name },
        isLoading: false,
        isError: false,
        isAuth: true,
        message: '',
      };
    case USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
      };
    case FORGOT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: '',
        isForgot: false,
      };
    case FORGOT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: '',
        isForgot: true,
      };
    case FORGOT_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.message,
        isForgot: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        isError: false,
        message: '',
      };
    default:
      return state;
  }
};

export default authReducer;
