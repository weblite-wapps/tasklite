// Modules
import React, { Suspense, lazy } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { hot } from 'react-hot-loader'
// Setup
import store, { history } from './redux' 
// Component
import App from '../components/Main/App.container.react'
import Snackbar from '../components/components/Snackbar/Snackbar.container.react'
import Loading from '../helper/components/Loading/Loading.presentational'
// styles
import './root.scss'
import theme from '../helper/style/appTheme'
// lazy loading
const Home = lazy(() =>
  import('../components/components/Home/Home.container.react'),
)
const Add = lazy(() =>
  import('../components/components/Add/Add.container.react')
)
const Edit = lazy(() =>
  import('../components/components/Edit/Main/Edit.container.react')
)
const About = lazy(() => import('../components/components/About/About'))

const root = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <div className="c--root_container">
            <App />
            <Snackbar location={{ vertical: 'bottom', horizontal: 'right' }} />

            <Suspense fallback={<Loading />}>
              <Route exact path="/" render={() => <Home />} />
              <Route exact path="/Add" render={() => <Add />} />
              <Route path="/Edit" render={() => <Edit />} />
              <Route path="/About" render={() => <About />} />
            </Suspense>
          </div>
        </ConnectedRouter>
      </MuiThemeProvider>
    </Provider>
  )
}

export default hot(module)(root)


