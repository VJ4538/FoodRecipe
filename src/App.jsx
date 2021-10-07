import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import routes, { renderRoutes } from './routes'
import { ThemeProvider } from '@material-ui/core'
import { createTheme } from './theme/index'
import useSettings from './hooks/useSettings'


const history = createBrowserHistory()

const App = () => {
  const { settings } = useSettings()
  const theme = createTheme({
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    theme: settings.theme,
  })

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
          {renderRoutes(routes)}
      </Router>
    </ThemeProvider>
  )
}

export default App
