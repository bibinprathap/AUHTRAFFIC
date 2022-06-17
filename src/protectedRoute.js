/* eslint-disable react/prop-types */
import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { getAuth } from './Auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
