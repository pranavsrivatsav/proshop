import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    // case 1: Before Fetching
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state };
    // case 2: Fetch success
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    // case 3: Fetch failure
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    // case 1: Before Fetching
    case PRODUCT_DETAILS_REQUEST:
      /*
        product needs to be reset, else it will show the previous loaded product,
        until the current product is fetched
      */
      return { loading: true, product: {} };
    // case 2: Fetch success
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    // case 3: Fetch failure
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
