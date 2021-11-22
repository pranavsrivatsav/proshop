import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_LOAD_ITEMS,
  CART_RELOAD,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from '../constants/cartConstants';

import toastMessage from '../utils/toastMessage';
import toast from 'react-hot-toast';

export const fetchCart = () => async (dispatch, getState) => {
  try {
    const toastId = toastMessage('Loading your cart...', 'loading');

    const { data } = await axios.get(`/api/cart`);

    dispatch({
      type: CART_LOAD_ITEMS,
      payload: data,
    });
    toast.dismiss(toastId);

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');
  }
};

export const addToCart = (product, qty) => async (dispatch, getState) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/cart`, { product, qty }, config);

    dispatch({
      type: CART_ADD_ITEM,
      payload: data,
    });

    const productName = data.cartItems[data.cartItems.length - 1].name;
    toastMessage(`${productName} - Added to cart`, 'success');

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');

    dispatch({
      type: CART_RELOAD,
    });
  }
};

export const removeFromCart = (product) => async (dispatch, getState) => {
  try {
    const toastId = toastMessage('Updating cart...', 'loading');
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { product },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );

    await axios.delete(`/api/cart/${product}`);

    toast.dismiss(toastId);
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');

    dispatch({
      type: CART_RELOAD,
    });
  }
};

export const updateCart = (product, qty) => async (dispatch, getState) => {
  try {
    const toastId = toastMessage('Updating cart...', 'loading');

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch({
      type: CART_UPDATE_ITEM,
      payload: { product, qty },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );

    await axios.patch(`/api/cart`, { product, qty }, config);
    toast.dismiss(toastId);
  } catch (error) {
    toast.dismiss();
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');

    dispatch({
      type: CART_RELOAD,
    });
  }
};
