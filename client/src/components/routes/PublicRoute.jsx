import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../front/common/Nav';
import Footer from '../Footer';

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            <Fragment>
                <Nav />
                <Component {...props} />
                <Footer />
            </Fragment>
        )}
    />
);

export default PublicRoute;
