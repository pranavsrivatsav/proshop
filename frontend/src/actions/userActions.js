import axios from '../axios';
import history from '../history';

import {
  USER_DETAILS_FAIL,
  USER_DETAILS_LOAD,
  USER_DETAILS_REMOVE,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_UPDATE,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

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
      type: USER_LOGIN_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_LOAD,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const logout = () => async (dispatch) => {
  await axios.get('/api/users/logout');

  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');

  dispatch({ type: USER_DETAILS_REMOVE });
  dispatch({ type: USER_LOGOUT });

  history.push('/login');
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

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
      type: USER_REGISTER_SUCCESS,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_LOAD,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const UpdateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE,
    });

    const { data } = await axios.put('/api/users/profile', user);

    dispatch({
      type: USER_DETAILS_LOAD,
      payload: data,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const fetchUserDetails =
  (redirect = '/') =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_DETAILS_UPDATE,
      });

      const { data } = await axios.get('/api/users/profile');

      dispatch({
        type: USER_DETAILS_LOAD,
        payload: data,
      });
    } catch (error) {
      if (error.response.status === 401 && redirect) {
        history.push(`/login?redirect=${redirect}`);
      } else {
        dispatch({
          type: USER_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.response.data,
        });
      }
    }
  };
