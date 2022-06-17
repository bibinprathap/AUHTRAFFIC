import React, { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import { useSession } from '../context/Sessioncontext'


// routes config
import routes from '../routes'

const AppContent = () => {

  const  {user} = useSession();
  //console.log( user?.role)
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
              render={(props) => {
              
                  // eslint-disable-next-line react/prop-types
                  // const { location } =props;
                  //   if (!user) {
                  //     return (
                  //       <Redirect to={{ pathname: '/', state: { from: location } }} />
                  //     )
                  //   }
                    return (<>
                    <route.component {...props} />
                  </>)
                  }}
                  
                />
              )
            )
          })}
           <Redirect from="/" to="/dashboard" />
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
