import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import ShoppingCart from './routes/ShoppingCart';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={ShoppingCart} />
        <Route path="/ShoppingCart" exact component={ShoppingCart} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
