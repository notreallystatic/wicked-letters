import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user, shallowEqual);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component user={user} /> : <Redirect to='/' />
      }
    />
  );
};

export const PublicRoute = ({ component: Component, ...rest }) => {
  const user = useSelector((state) => state.user, shallowEqual);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Component {...props} /> : <Redirect to='/dashboard' />
      }
    />
  );
};
