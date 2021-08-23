import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { loadUser } from './actions/auth';
import store from './store';
import Notification from './components/Notification';
import PublicRoute from './components/routes/PublicRoute';

// Public Routes
import NotFound from './components/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/front/pages/Landing';
import About from './components/front/pages/About';
import Blog from './components/front/pages/Blog';
import Products from './components/front/pages/Products';
import Product from './components/front/pages/Product';
import Checkout from './components/front/pages/Checkout';
import Cart from './components/front/pages/Cart';
import Thanks from './components/front/pages/Thanks';
import Steps from './components/front/pages/ReduxSteps';
// Private Routes
import Routes from './components/routes/Routes';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Notification />
        <Switch>
          <Route exact path="/" component={Landing} />
          <PublicRoute path="/register" component={Register} />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/about" component={About} />
          <PublicRoute exact path="/blog" component={Blog} />
          <PublicRoute path="/shop" component={Products} />
          <PublicRoute path="/product/:id" component={Product} />
          <PublicRoute path="/checkout" component={Checkout} />
          <PublicRoute path="/cart" component={Cart} />
          <PublicRoute path="/thanks" component={Thanks} />
          <PublicRoute path="/blog/steps/redux" component={Steps} />
          <PublicRoute path="/blog/steps/express" component={Steps} />
          {/* Private Routes */}
          <Routes />

          <Route to="/404" component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
