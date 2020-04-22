import {
  LOGIN_ERROR,
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  SET_PROFILE_PICTURE_URI
} from "../actions/actionTypes";

const initialState = {
  isLoginPending: false,
  isLoginSuccessful: false,
  loginErrorMessage: null,
  isRegisterPending: false,
  isRegisterSuccessful: false,
  registerErrorMessage: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: action.isLoginPending,
        isLoginSuccessful: false,
        loginErrorMessage: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccessful: action.isLoginSuccessful
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginErrorMessage: action.loginErrorMessage
      };
    case LOGOUT:
      return {
        ...state,
        ...initialState
      };
    case REGISTER_PENDING:
      return {
        ...state,
        isRegisterPending: action.isRegisterPending,
        isRegisterSuccessful: false,
        registerErrorMessage: null
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterSuccessful: action.isRegisterSuccessful
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerErrorMessage: action.registerErrorMessage
      };
    case SET_PROFILE_PICTURE_URI:
      return {
        ...state,
        uri: action.uri
      };
    default:
      return state;
  }
};

export default authReducer;
