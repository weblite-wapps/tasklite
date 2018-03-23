// Modules
import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from 'material-ui/styles'
// Setup
import store, { history } from './redux'
// Component
import App from '../components/Main/App.container.react'
import About from '../components/components/About/About'
// scssClasses
import scssClasses from './root.scss'
import theme from '../helper/style/appTheme'


export default function root() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <div className={scssClasses.container}>
            <Route exact path="/" component={App} />
            <Route path="/About" component={About} />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  )
}
