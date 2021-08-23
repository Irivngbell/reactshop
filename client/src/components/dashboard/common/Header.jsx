import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';
import { Fragment } from 'react';

const Header = ({ logout, auth: { isAuthenticated } }) => {
    function handleLogout(e) {
        e.preventDefault();

        logout();
    }

    return (
        <Fragment>
            {!isAuthenticated ? (
                <Redirect to="/" />
            ) : (
                <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                    <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3" to="/">
                        E-commerce Dashboard
                    </Link>

                    <div className="navbar-nav">
                        {/*Implémenter logout*/}
                        <div className="nav-item text-nowrap">
                            <Link
                                className="nav-link px-3"
                                to="!#"
                                onClick={handleLogout}
                            >
                                Sign out
                            </Link>
                        </div>
                    </div>
                </header>
            )}
        </Fragment>
    );
};

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProp = state => ({
    auth: state.auth,
});

export default connect(mapStateToProp, { logout })(Header);
