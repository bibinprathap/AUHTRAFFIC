import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { icons } from './assets/icons'

import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apolloclient';
import { ToastContainer } from 'react-toastify';

import { SessionProvider } from './context/Sessioncontext'

React.icons = icons

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
    <SessionProvider>
      <App />
      <ToastContainer />
      </SessionProvider>
    </Provider></ApolloProvider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
