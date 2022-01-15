import axios from '../axios';
import toast from 'react-hot-toast';
import {
  PRODUCT_DETAILS_LOAD,
  PRODUCT_LIST_LOAD,
} from '../constants/productConstants';

import toastMessage from '../utils/toastMessage';
import errorHandler from '../utils/errorHandler';

export const fetchProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/products');
    dispatch({ type: PRODUCT_LIST_LOAD, payload: data });
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  const toastId = toastMessage('loading product...', 'loading');
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAILS_LOAD, payload: data });

    toast.dismiss(toastId);
  } catch (error) {
    errorHandler(error, dispatch, toastId);
  }
};
