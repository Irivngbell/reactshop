import {
  GET_CART,
  ADD_TO_CART,
  GET_CART_PRODUCTS,
  GET_CART_COUNT,
  UPDATE_QTY,
  REMOVE_FROM_CART,
} from '../actions/types';
import { setAlert } from '../actions/alert';
/**
 *
 * @type {{cart: *[]}}
 */
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  products: [],
  count: 0,
};

export default function cart(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CART:
      return state;

    case GET_CART_COUNT:
      return {
        ...state,
        count: state.products.reduce((acc, curr) => acc + curr.qty, 0),
      };

    case ADD_TO_CART:
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(payload);
      localStorage.setItem('cart', JSON.stringify(cart));
      return {
        ...state,
        cart: cart,
      };

    case GET_CART_PRODUCTS:
      return {
        ...state,
        products: payload,
      };

    case UPDATE_QTY:
      const item = state.cart.find(item => item.id == payload.id);
      const newCart = state.cart.filter(item => item.id != payload.id);
      item.qty = payload.qty;
      newCart.push(item);
      return {
        ...state,
        products: newCart,
      };

    case REMOVE_FROM_CART:
      localStorage.setItem(
        'cart',
        JSON.stringify(
          state.products.filter(product => product.id != payload.id)
        )
      );
      return {
        ...state,
        products: state.products.filter(item => item.id != payload.id),
      };
    default:
      return state;
  }
}
