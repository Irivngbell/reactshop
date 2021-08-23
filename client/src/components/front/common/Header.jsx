import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import kenshiro from '../assets/img/kenshiro.jpg';
import { logout } from '../../../actions/auth';

const Header = ({
  auth: { isAuthenticated },
  logout,
  cart: { cart, count },
}) => {
  function handleLogout(e) {
    e.preventDefault();

    logout();
  }

  return (
    <header className="with-background">
      <div className="top-nav container">
        <div className="logo">
          <NavLink exact to="/">
            React / Redux / Express / MySQL Ecommerce
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

          {/* SI pas authentifié : afficher un line vers signup, sinon afficher un lien vers dashboard */}

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
        </ul>
      </div>

      <div className="hero container">
        <div className="hero-copy">
          <h1>Le roi de la merguez a encore frappe</h1>

          <p>Des produits, Des categories, un panier et Stripe</p>
          <div className="hero-buttons">
            <a href="!#" className="button button-white">
              Blog Post
            </a>
            <a href="!#" className="button button-white">
              GitHub
            </a>
          </div>
        </div>

        <div className="hero-image">
          <img src={kenshiro} alt="heropages" />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, { logout })(Header);
