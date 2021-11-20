import {
  USER_DETAILS_FAIL,
  USER_DETAILS_LOAD,
  USER_DETAILS_REMOVE,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_UPDATE,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, registered: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, loggedIn: true };
    case USER_LOGIN_FAIL:
      return { loading: false, loggedIn: false, error: action.payload };
    case USER_LOGOUT:
      return { loggedIn: false };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DETAILS_LOAD:
      return { details: action.payload };
    case USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };
    case USER_DETAILS_REMOVE:
      return {};
    case USER_DETAILS_UPDATE:
      return { ...state, loading: true };
    default:
      return state;
  }
};
