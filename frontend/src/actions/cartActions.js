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

import errorHandler from '../utils/errorHandler';

export const fetchCart = () => async (dispatch, getState) => {
  const toastId = toastMessage('Loading your cart...', 'loading');

  try {
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
    errorHandler(error, dispatch, toastId);
  }
};

export const addToCart = (products) => async (dispatch, getState) => {
  try {
    const { userLogin, cart } = getState();

    let data;

    if (!userLogin.loggedIn) {
      const cartItems = cart.cartItems.concat(products);
      data = { cartItems };
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.put(`/api/cart`, { products }, config);
      data = response.data;
    }

    dispatch({
      type: CART_ADD_ITEM,
      payload: data,
    });

    if (products.length === 1) {
      const productName = data.cartItems[data.cartItems.length - 1].name;
      toastMessage(`${productName} - Added to cart`, 'success');
    }

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
    errorHandler(error);

    dispatch({
      type: CART_RELOAD,
    });
  }
};

export const removeFromCart = (cartItem) => async (dispatch, getState) => {
  const toastId = toastMessage('Updating cart...', 'loading');

  try {
    const { product, cartIndex, name } = cartItem;
    const message = `${name} has been removed from the cart`;

    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { cartIndex },
    });

    const { userLogin, cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));

    userLogin.loggedIn && (await axios.delete(`/api/cart/${product}`));

    toast.dismiss(toastId);
    toastMessage(message, 'success');
  } catch (error) {
    errorHandler(error, dispatch, toastId);

    dispatch({
      type: CART_RELOAD,
    });
  }
};

export const updateCart = (cartItem, qty) => async (dispatch, getState) => {
  const toastId = toastMessage('Updating cart...', 'loading');

  try {
    const { product, cartIndex, name } = cartItem;
    const message = `Quantity of '${name}' has been changed to '${qty}'`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    dispatch({
      type: CART_UPDATE_ITEM,
      payload: { cartIndex, qty },
    });

    const { userLogin, cart } = getState();
    localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));

    userLogin.loggedIn &&
      (await axios.patch(`/api/cart`, { product, qty }, config));
    toast.dismiss(toastId);
    toastMessage(message, 'success');
  } catch (error) {
    errorHandler(error, dispatch, toastId);

    dispatch({
      type: CART_RELOAD,
    });
  }
};
