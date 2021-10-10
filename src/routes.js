import React, { Suspense, Fragment, lazy } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment
        const Component = route.component

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                    <Component {...props} />
                  )}
                </Layout>
            )}
          />
        )
      })}
    </Switch>
  </Suspense>
)

const routes = [
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('./views/errors/NotFoundView')),
  },
  {
    exact:true,
    path: '/calculator',
    component: lazy(() => import('./views/Calculator/index')),
  },

  {
    exact:true,
    path: '/search',
    component: lazy(() => import('./views/search/index')),
  },

  {
    exact:true,
    path: '/mealplan',
    component: lazy(() => import('./views/mealPlan/index')),
  },

  {
    exact: true,
    path: '/recipe/:recipeId',
    component: lazy(() => import('./views/recipeDetail/index')),
  },

  {
    exact: true,
    path: '/recipe/:recipeId/:search',
    component: lazy(() => import('./views/recipeDetail/index')),
  },

  {
    exact: true,
    path: '/article/:articleId',
    component: lazy(() => import('./views/articles/index')),
  },

  {
    path: '*',
    routes: [
      {
        exact: true,
        path: '/',
        component: lazy(() => import('./views/homePage/index')),
      },
      {
        component: () => <Redirect to='/404' />,
      },
    ],
  },
]

export default routes
