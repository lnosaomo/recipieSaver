import React, { useState, useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { loading, isAuthenticated } = authContext;

  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/recipe' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
