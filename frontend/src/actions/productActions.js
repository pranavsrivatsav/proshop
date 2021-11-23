import axios from '../axios';
import toast from 'react-hot-toast';
import {
  PRODUCT_DETAILS_LOAD,
  PRODUCT_LIST_LOAD,
} from '../constants/productConstants';

import toastMessage from '../utils/toastMessage';

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_LOAD, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    toastMessage(errorMessage, 'error');
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  const toastId = toastMessage('loading product...', 'loading');
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_LOAD, payload: data });

    toast.dismiss(toastId);
  } catch (error) {
    toast.dismiss(toastId);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    toastMessage(errorMessage, 'error');
  }
};
