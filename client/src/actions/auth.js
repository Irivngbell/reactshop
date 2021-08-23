import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import setAuthToken from '../utils/setAuthToken';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * @namespace localStorage
 * @returns {function(*): Promise<void>}
 */
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  ({ email, password, url }) =>
  async dispatch => {
    const data = JSON.stringify({ email, password });

    try {
      const res = await axios.post(url, data);

      if (url === '/api/users/register') {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
        return dispatch(loadUser());
      }

      return dispatch(setAlert('Employé embauché', 'success'));
    } catch (e) {
      const errors = e.message;
      console.log(e.message);
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
      }
      if (url === '/api/users/register') {
        dispatch({
          type: REGISTER_FAIL,
        });
      }
    }
  };

export const login = (email, password) => async dispatch => {
  const data = JSON.stringify({ email, password });

  try {
    const res = await axios.post('api/auth', data);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
