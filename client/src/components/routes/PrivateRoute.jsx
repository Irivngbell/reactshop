import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../dashboard/common/Header';
import Nav from '../dashboard/common/Nav';
import QuickActions from '../dashboard/common/QuickActions';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated && loading ? (
                <Redirect to="login" />
            ) : (
                <Fragment>
                    <Header />
                    <Nav />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <QuickActions />
                        <Component {...props} />
                    </main>
                </Fragment>
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
