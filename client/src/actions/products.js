import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  CREATE_PRODUCT,
  PRODUCT_ERROR,
  UPDATE_PRODUCT,
  DESTROY_PRODUCT,
} from './types';

export const getProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');

    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e },
    });
  }
};
export const getProduct = id => async dispatch => {
  try {
    dispatch({
      type: GET_PRODUCT,
      payload: parseInt(id),
    });
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e },
    });
  }
};

export const createProduct = formData => async dispatch => {
  try {
    const res = await axios.post('/api/products/create', formData);

    dispatch({
      type: CREATE_PRODUCT,
      payload: res.data,
    });

    dispatch(setAlert('produit cree !', 'success'));
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const updateProduct = formData => async dispatch => {
  try {
    await axios.patch('/api/products/update', formData);

    dispatch(getProducts());

    dispatch(setAlert('produit a jour !', 'success'));
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};

export const destroyProduct = formData => async dispatch => {
  try {
    await axios.delete(`/api/products/destroy`, { data: formData });

    dispatch(getProducts());

    dispatch(setAlert('Bye Bye product !', 'success'));
  } catch (e) {
    console.log(e);
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: e.response.statusText, status: e.response.status },
    });
  }
};
