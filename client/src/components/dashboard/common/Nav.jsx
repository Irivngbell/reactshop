import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Nav = ({
    auth: {
        user: { Role },
    },
}) => {
    const { name } = Role;
    console.log(name);

    return (
        <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-light sidebar-admin collapse"
        >
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink exact className="nav-link" aria-current="page" to="/">
                            <span className="fas fa-store" /> WebSite
                        </NavLink>
                        <NavLink
                            exact
                            className="nav-link"
                            aria-current="page"
                            to="/dashboard"
                        >
                            <span className="fas fa-home" /> Dashboard
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/profile/me"
                        >
                            <span className="fas fa-users" /> Votre Profile
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            aria-current="page"
                            to="/your/orders"
                        >
                            <span className="fas fa-shopping-cart" /> Vos commandes
                        </NavLink>
                    </li>
                </ul>

                {name === 'admin' || name === 'employee' || name === 'author' ? (
                    <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                        <span>Administration</span>
                    </h6>
                ) : null}

                <ul className="nav flex-column mb-2">
                    {name === 'admin' && (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    exact
                                    to="/dashboard/current"
                                >
                                    <span
                                        className="fas fa-file"
                                        data-feather="file-text"
                                    />{' '}
                                    Resume
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/dashboard/roles"
                                >
                                    <span className="fas fa-user-lock" /> Gestion des
                                    Rôles
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/dashboard/employees"
                                >
                                    <span className="fas fa-user" /> Employés
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    exact
                                    className="nav-link"
                                    aria-current="page"
                                    to="/dashboard/categories"
                                >
                                    <span className="fas fa-file" /> Categories
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                    {(name === 'admin' || name === 'employee') && (
                        <li className="nav-item">
                            <NavLink
                                exact
                                className="nav-link"
                                aria-current="page"
                                to="/dashboard/products"
                            >
                                <span className="fas fa-store" /> Produits
                            </NavLink>
                        </li>
                    )}
                    {(name === 'author' || name === 'admin') && (
                        <li className="nav-item">
                            <NavLink
                                exact
                                className="nav-link"
                                aria-current="page"
                                to="/dashboard/articles"
                            >
                                <span className="fas fa-pen" /> Articles (blog)
                            </NavLink>
                        </li>
                    )}

                    {name === 'admin' && (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    className="nav-link"
                                    aria-current="page"
                                    to="/dashboard/customers"
                                >
                                    <span className="fas fa-users" /> Clients
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    className="nav-link"
                                    aria-current="page"
                                    to="/dashboard/reports"
                                >
                                    <span className="fas fa-area-chart" /> Rapports
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(Nav);
