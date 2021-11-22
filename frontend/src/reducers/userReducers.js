import {
  USER_DETAILS_LOAD,
  USER_DETAILS_REMOVE,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
} from '../constants/userConstants';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER:
      return { registered: true };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { loggedIn: true };
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
    case USER_DETAILS_REMOVE:
      return {};
    default:
      return state;
  }
};
