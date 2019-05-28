// Modules
import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { hot } from 'react-hot-loader'
// Setup
import store, { history } from './redux'
// Component
import AppBar from '../components/components/AppBar/AppBar.container.react'
import App from '../components/Main/App.container.react'
import Edit from '../components/components/Edit/Main/Edit.container.react'
import About from '../components/components/About/About'
// styles
import './root.scss'
import theme from '../helper/style/appTheme'

const root = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <div className="c--root_container">
            <AppBar />
            <Route exact path="/" component={App} />
            <Route exact path="/Edit" component={Edit} />
            <Route path="/About" component={About} />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default hot(module)(root)
