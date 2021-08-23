import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { logout } from '../../../actions/auth';
import {
  getCartCount,
  getCart,
  getProductsInCart,
} from '../../../actions/cart';

const Nav = ({
  auth: { isAuthenticated },
  logout,
  cart: { cart, products, count },
  getCartCount,
  getCart,
  getProductsInCart,
}) => {
  //

  useEffect(() => {
    if (cart.length > 0) {
      const ids = cart.map(item => item.id);

      getProductsInCart(ids);
    }
  }, [cart]);

  useEffect(() => {
    getCart();
    //(products.length > 0) {
    getCartCount();
    //}
  }, [products, cart]);

  function handleLogout(e) {
    e.preventDefault();

    logout();
  }

  return (
    <header>
      <div className="top-nav container">
        <div className="logo">
          <NavLink exact to="/">
            MERN Ecommerce
          </NavLink>
        </div>

        <ul>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/blog">Blog</NavLink>
          </li>

          {/* Si pas authentifié : afficher un line vers signup, sinon afficher un lien vers dashboard */}

          {!isAuthenticated ? (
            <Fragment>
              <li>
                <NavLink to="/register">Signup</NavLink>
              </li>
              <li>
                <NavLink to="/login">Sign in</NavLink>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                <NavLink onClick={handleLogout} to="/logout">
                  Logout
                </NavLink>
              </li>
            </Fragment>
          )}
          <li>
            <NavLink to="/cart">
              Cart{' '}
              <span className="cart-count">
                <span>{count}</span>
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};

Nav.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  getCartCount: PropTypes.func.isRequired,
  getCart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, {
  logout,
  getCartCount,
  getCart,
  getProductsInCart,
})(Nav);
