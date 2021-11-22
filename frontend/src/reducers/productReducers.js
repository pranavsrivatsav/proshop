import {
  PRODUCT_LIST_LOAD,
  PRODUCT_DETAILS_LOAD,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_LOAD:
      return { products: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_LOAD:
      return { product: action.payload };
    default:
      return state;
  }
};
