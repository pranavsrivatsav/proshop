import { combineReducers } from 'redux';

import initialState from '../initialState';
import { productListReducer, productDetailsReducer } from './productReducers';
import { cartReducer } from './cartReducers';
import { userLoginReducer, userDetailsReducer } from './userReducers';
import { USER_LOGOUT } from '../constants/userConstants';

const appReducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  user: userDetailsReducer,
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      console.log(state.products);
      return appReducer({ products: state.products, ...initialState }, action);
    default:
      return appReducer(state, action);
  }
};

export default rootReducer;
