import {
  USER_DETAILS_LOAD,
  USER_DETAILS_REMOVE,
  USER_LOGIN,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { loggedIn: true };
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
