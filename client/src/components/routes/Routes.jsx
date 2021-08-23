import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import store from '../../store';
import { loadUser } from '../../actions/auth';

import PrivateRoute from './PrivateRoute';

import CreateCategory from '../dashboard/CreateCategory';
import CreateArticle from '../dashboard/CreateArticle';
import CreateRoles from '../dashboard/CreateRoles';
import CustomerOrders from '../dashboard/CustomerOrders';
import Today from '../dashboard/Today.jsx';
import CreateProducts from '../dashboard/CreateProducts';
import Customers from '../dashboard/Customers';
import Reporting from '../dashboard/Reporting';
import Employees from '../dashboard/Employees';
import Dashboard from '../dashboard/Dashboard';
import UserInfo from '../dashboard/UserInfo';
import NotFound from '../NotFound';

const Routes = ({ auth }) => {
  return (
    <Fragment>
      {auth?.user ? (
        <Fragment>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/profile/me" component={UserInfo} />
          {auth.user.Role.name === 'admin' && (
            <Fragment>
              <PrivateRoute
                exact
                path="/dashboard/categories"
                component={CreateCategory}
              />
              <PrivateRoute
                exact
                path="/dashboard/roles"
                component={CreateRoles}
              />
              <PrivateRoute
                exact
                path="/dashboard/employees"
                component={Employees}
              />
              <PrivateRoute
                exact
                path="/dashboard/reports"
                component={Reporting}
              />
              <PrivateRoute
                exact
                path="/your/orders"
                component={CustomerOrders}
              />
              <PrivateRoute exact path="/dashboard/current" component={Today} />
              <PrivateRoute
                exact
                path="/dashboard/customers"
                component={Customers}
              />
            </Fragment>
          )}
          {(auth.user.Role.name === 'admin' ||
            auth.user.Role.name === 'author') && (
            <PrivateRoute
              exact
              path="/dashboard/articles"
              component={CreateArticle}
            />
          )}
          {(auth.user.Role.name === 'admin' ||
            auth.user.Role.name === 'employee') && (
            <PrivateRoute
              exact
              path="/dashboard/products"
              component={CreateProducts}
            />
          )}
        </Fragment>
      ) : (
        <Route component={NotFound} />
      )}
    </Fragment>
  );
};

Routes.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Routes);
