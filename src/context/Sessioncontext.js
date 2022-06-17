import { createContext, useContext, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useCookies } from 'react-cookie'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import { notifyToast } from 'src/views/components/notifications/toasts/notifyToast'
import React from 'react'

export const ME_QUERY = gql`
  query {
    userme {
      name
      email
      password
      userType
      _id
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation UserloginMutation($userloginUsername: String!, $userloginPassword: String!) {
    userlogin(username: $userloginUsername, password: $userloginPassword) {
      token
      user {
        name
        email
        password
        userType
      }
    }
  }
`


const SessionContext = createContext()

export const SessionProvider = (props) => {
  const { children } = props
  const history = useHistory()
  //const location = useLocation();
  const [user, setUser] = useState(null)
  const [, setCookie, removeCookie] = useCookies(['token'])
  const [loadMe, { loading, data, client }] = useLazyQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
  })
  const [login] = useMutation(LOGIN_MUTATION)
  const handleLogin = useCallback(
    async (username, password) => {
      const res = await login({
        variables: { userloginUsername: username, userloginPassword: password },
      })
      if (res?.data?.userlogin?.token && res?.data?.userlogin?.user.userType === 'Admin') {
        setCookie('token', res?.data?.userlogin?.token, { maxAge: 86400 })
        //console.log( res?.data?.userlogin?.user)
        setUser(res?.data?.userlogin?.user)
      } else {
        let message = res?.errors?.[0]?.message || "Failed to login user!"
        if (res?.data?.userlogin?.user.userType !== 'Admin') message = 'Not Authorized user!'
        notifyToast({ message, type: 'error' })
        throw new Error(res?.errors?.[0]?.message || { message: 'Not Authorized user' })
      }
    },
    [history, login, setCookie],
  )
  const handleLogout = useCallback(async () => {
    removeCookie('token', { maxAge: 86400 })
    await client.clearStore()
    await loadMe()
    setUser(null)
  }, [client, loadMe, removeCookie])
  useEffect(() => {
    if (data?.userme) {
      setUser(data?.userme)
    } else {
      if (history) history.push('/login')
    }
  }, [data, history])
  //   useEffect(
  //     () => {
  //       const loadData = async () => {
  //         try {
  //           await loadMe()
  //         } catch (err) {
  //           handleLogout()
  //         }
  //       }
  //       loadData()
  //     },
  //     [handleLogout, loadMe, removeCookie],
  //   )
  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <SessionContext.Provider
      value={{
        loading,
        user,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

SessionProvider.propTypes = {
  children: PropTypes.any,
}

export const useSession = () => useContext(SessionContext)
export default SessionContext
