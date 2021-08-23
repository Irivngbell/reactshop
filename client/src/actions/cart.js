import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_CART,
  ADD_TO_CART,
  GET_CART_PRODUCTS,
  GET_CART_COUNT,
  UPDATE_QTY,
  REMOVE_FROM_CART,
} from './types';

export const getCart = () => async dispatch => {
  try {
    dispatch({
      type: GET_CART,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCartCount = () => async dispatch => {
  dispatch({
    type: GET_CART_COUNT,
  });
};

export const addToCart = product => async (dispatch, state) => {
  try {
    if (!product.qty) {
      product.qty = 1;
    }

    delete product.image;

    const {
      cart: { cart },
    } = state();

    const item = cart.find(item => product.id === item.id);

    if (!item) {
      dispatch({
        type: ADD_TO_CART,
        payload: product,
      });

      //
      dispatch(setAlert('Produit ajouté au panier', 'success'));
    }
  } catch (e) {
    console.log(e);
  }
};

export const getProductsInCart = formData => async dispatch => {
  try {
    const res = await axios.post('/api/cart', { ids: formData });

    dispatch({
      type: GET_CART_PRODUCTS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const updateQty = formData => async dispatch => {
  try {
    dispatch({
      type: UPDATE_QTY,
      payload: formData,
    });

    dispatch(setAlert('Qty mis à jour !', 'success'));
  } catch (e) {
    console.log(e);
  }
};

export const updateCart = formData => async dispatch => {
  try {
    dispatch(setAlert('Panier mis à jour !', 'success'));
  } catch (e) {
    console.log(e);
  }
};

export const removeFromCart = formData => async dispatch => {
  try {
    dispatch({ type: REMOVE_FROM_CART, payload: formData });
  } catch (e) {
    console.log(e);
  }
};

export const destroyCart = formData => async dispatch => {
  try {
    dispatch(setAlert('Votre panier est vide !', 'success'));
  } catch (e) {
    console.log(e);
  }
};
