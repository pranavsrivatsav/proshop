import axios from 'axios';

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

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  dispatch({ type: USER_DETAILS_REMOVE });
  dispatch({ type: USER_LOGOUT });
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

export const UpdateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_UPDATE,
    });

    const token = getState().user.details.token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (token) {
      const { data } = await axios.put('/api/users/profile', user, config);
      console.log('updated data:', data);

      dispatch({
        type: USER_DETAILS_LOAD,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    }
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

// export const fetchUserDetails = () => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: USER_DETAILS_REQUEST,
//     });

//     const { userInfo } = getState().userLogin;

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//       },
//     };

//     if (userInfo) {
//       const { data } = await axios.get('/api/users/profile', config);
//       console.log('fetched data:', data);
//       dispatch({
//         type: USER_DETAILS_SUCCESS,
//         payload: data,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: USER_DETAILS_FAIL,
//       payload:
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.response.data,
//     });
//   }
// };
