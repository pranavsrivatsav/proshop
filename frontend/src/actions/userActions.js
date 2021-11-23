import axios from '../axios';
import history from '../history';
import toast from 'react-hot-toast';

import toastMessage from '../utils/toastMessage';

import {
  USER_DETAILS_LOAD,
  USER_DETAILS_REMOVE,
  USER_LOGIN,
  USER_LOGOUT,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
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
  } catch (error) {
    toast.dismiss(toastId);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');
  }
};

export const logout = () => async (dispatch) => {
  const toastId = toastMessage('Logging out...', 'loading');
  await axios.get('/api/users/logout');

  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');

  dispatch({ type: USER_DETAILS_REMOVE });
  dispatch({ type: USER_LOGOUT });

  toast.dismiss(toastId);
  toastMessage('Logged out', 'success');

  history.push('/auth');
};

export const register = (name, email, password) => async (dispatch) => {
  const toastId = toastMessage('Signing up...', 'loading');

  try {
    console.log(toastId);

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
    toast.dismiss(toastId);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');
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
    toast.dismiss(toastId);
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.response.data;

    toastMessage(errorMessage, 'error');
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
      if (error.response.status === 401 && redirect) {
        history.push(`/auth?redirect=${redirect}`);
      } else {
        const errorMessage =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data;

        toastMessage(errorMessage, 'error');
      }
    }
  };
