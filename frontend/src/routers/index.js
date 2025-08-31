import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { useSelector } from 'react-redux';
import Urls from '../constants/urls.constant';

import HomeScreen from '../screens/home/home.screen';
import LoginScreen from '../screens/login/login.screen';
// import RegisterScreen from '../screens/register.screen';

const PrivateRoute = ({ component: Component, requireLogin, isLoggedIn, ...rest }) => {
  
  return (
    <Route {...rest}
      render={(props) => (
        !isLoggedIn && requireLogin
          ? <Redirect to={{
            pathname: Urls.LOGIN,
            state: { from: props.location }
          }} />
          : <Component {...props} />
      )} />
  )
}

const PublicRoutes = ({ history }) => {
  let { isLoggedIn } = useSelector(state => state.user);
  console.log('loggedin', isLoggedIn);
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path={Urls.LOGIN} component={LoginScreen} />
        {/* <Route exact path={Urls.REGISTER} component={RegisterScreen} /> */}

        <PrivateRoute
          // exact
          requireLogin
          isLoggedIn={isLoggedIn}
          path={Urls.HOME}
          component={HomeScreen} />

      </Switch>
    </ConnectedRouter>
  );
}

export default PublicRoutes;
