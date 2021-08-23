import { CREATE_PRODUCT, GET_PRODUCTS, GET_PRODUCT } from '../actions/types';

/**
 *
 * @type {{product: {}, products: *[]}}
 */
const initialState = {
  products: [],
  product: {},
};

export default function products(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        products: state.products,
        product: state.products.find(product => product.id === payload),
      };
    case CREATE_PRODUCT:
      return {
        ...state,
        products: [...state.products, payload.product],
      };
    default:
      return state;
  }
}
