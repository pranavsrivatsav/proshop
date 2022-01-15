import axios from '../axios';
import history from '../history';
import toast from 'react-hot-toast';

import toastMessage from '../utils/toastMessage';
import errorHandler from '../utils/errorHandler';

import {
  USER_DETAILS_LOAD,
  USER_DETAILS_REMOVE,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants/userConstants';

import { addToCart } from './cartActions';

export const login = (email, password) => async (dispatch, getState) => {
  const toastId = toastMessage('Signing in...', 'loading');

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN,
    });

    dispatch({
      type: USER_DETAILS_LOAD,
      payload: data,
    });

    toast.dismiss(toastId);
    toastMessage('Signed in', 'success');
    localStorage.setItem('userInfo', JSON.stringify(data));
    dispatch(addToCart(getState().cart.cartItems));
  } catch (error) {
    errorHandler(error, dispatch, toastId);
  }
};

export const SocialLogin =
  (email, id, platform) => async (dispatch, getState) => {
    const toastId = toastMessage('Signing in...', 'loading');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        `/api/users/login?platform=${platform}`,
        { email, id },
        config
      );

      dispatch({
        type: USER_LOGIN,
      });

      dispatch({
        type: USER_DETAILS_LOAD,
        payload: data,
      });

      toast.dismiss(toastId);
      toastMessage('Signed in', 'success');
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch(addToCart(getState().cart.cartItems));
    } catch (error) {
      errorHandler(error, dispatch, toastId);
    }
  };

export const logout = () => async (dispatch) => {
  const toastId = toastMessage('Logging out...', 'loading');

  try {
    await axios.get('/api/users/logout');

    dispatch({ type: USER_DETAILS_REMOVE });
    dispatch({ type: USER_LOGOUT });

    toast.dismiss(toastId);
    toastMessage('Logged out', 'success');

    localStorage.clear();
    history.push('/auth');
    window.location.reload();
  } catch (error) {
    errorHandler(error, dispatch);
  }
};

export const register = (name, email, password) => async (dispatch) => {
  const toastId = toastMessage('Signing up...', 'loading');

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_LOGIN,
    });

    dispatch({
      type: USER_DETAILS_LOAD,
      payload: data,
    });

    toast.dismiss(toastId);
    toastMessage('Account created successfully', 'success');

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    errorHandler(error, dispatch, toastId);
  }
};

export const UpdateUserProfile = (user) => async (dispatch) => {
  const toastId = toastMessage('Updating Profile...', 'loading');

  try {
    const { data } = await axios.put('/api/users/profile', user);

    dispatch({
      type: USER_DETAILS_LOAD,
      payload: data,
    });

    toast.dismiss(toastId);
    toastMessage('Profile updated', 'success');
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    errorHandler(error, dispatch, toastId);
  }
};

export const fetchUserDetails =
  (redirect = '/') =>
  async (dispatch) => {
    try {
      const { data } = await axios.get('/api/users/profile');

      dispatch({
        type: USER_DETAILS_LOAD,
        payload: data,
      });
    } catch (error) {
      errorHandler(error, dispatch, null, redirect, { showError: false });
    }
  };
