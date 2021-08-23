import { combineReducers } from 'redux';

import alert from './alert';
import auth from './auth';
import categories from './categories';
import articles from './articles';
import roles from './roles';
import users from './users';
import products from './products';
import cart from './cart';

export default combineReducers({
  alert,
  auth,
  categories,
  articles,
  roles,
  users,
  products,
  cart,
});
