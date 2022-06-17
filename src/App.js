/* eslint-disable react/prop-types */
import React, { Component, useEffect } from 'react'
import { HashRouter, Route, Switch,useHistory } from 'react-router-dom'
import './scss/style.scss'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './protectedRoute'
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {

  return (
    <HashRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) =><Register {...props}/>}
          />
          <PrivateRoute exact path="/404" name="Page 404" component= {Page404 } />
          <PrivateRoute exact path="/500" name="Page 500" component={Page500 } />
          <PrivateRoute path="/" name="Home" component={DefaultLayout} />
        </Switch>
      </React.Suspense>
    </HashRouter>
  )
}

export default App
