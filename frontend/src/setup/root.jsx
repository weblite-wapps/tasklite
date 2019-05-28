// Modules
// import React, { Suspense, lazy } from 'react'
import React from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { hot } from 'react-hot-loader'
// Setup
import store, { history } from './redux' 
// Component
// const Home = lazy(() =>
//   import('../components/components/Home/Main/Home.container.react'),
// )

import App from '../components/Main/App.container.react'
import Home from '../components/components/Home/Home.container.react'
import Edit from '../components/components/Edit/Main/Edit.container.react'
import About from '../components/components/About/About'
import Snackbar from '../components/components/Snackbar/Snackbar.container.react'
// styles
import './root.scss'
import theme from '../helper/style/appTheme'

const root = () => { 
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <div className="c--root_container">
            <App />
            <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />

            <Route exact path="/" component={Home} />
            <Route exact path="/Edit" component={Edit} />
            <Route path="/About" component={About} />
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default hot(module)(root)


{/* <Suspense fallback={<Loading />}>
  <Route exact path="/" render={() => <Home />} />
  <Route path="/Add" render={() => <Add />} />
  <Route path="/Report" render={() => <Report />} />
  <Route path="/About" render={() => <About />} />
  <Route path="/Edit" render={() => <Edit />} />
</Suspense> */}