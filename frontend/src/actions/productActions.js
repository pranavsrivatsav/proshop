import axios from 'axios';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
} from '../constants/productConstants';

export const fetchProducts = () => async (dispatch) => {
  try {
    // Action to inform the reducer that the request is to be fetched
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products');

    // Action to provide the reducer with the fetched products data
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    /*
      Action to inform the reducer about the failure to fetch products,
      along with the error message 
    */
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    // Action to inform the reducer that the request is to be fetched
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    // Action to provide the reducer with the fetched products data
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    /*
      Action to inform the reducer about the failure to fetch products,
      along with the error message 
    */
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
