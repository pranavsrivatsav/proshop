import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_FAIL,
  CART_LOAD_ITEMS,
  CART_REMOVE_ITEM,
  CART_SUCCESS,
  CART_UPDATE_ITEM,
} from '../constants/cartConstants';

export const fetchCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_LOAD_ITEMS,
    });

    const { data } = await axios.get(`/api/cart`);

    dispatch({
      type: CART_SUCCESS,
      payload: data,
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
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

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const removeFromCart = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { product },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );

    await axios.delete(`/api/cart/${product}`);
  } catch (error) {
    fetchCart();

    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const updateCart = (product, qty) => async (dispatch, getState) => {
  try {
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
  } catch (error) {
    fetchCart();
    dispatch({
      type: CART_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
