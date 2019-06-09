// modules
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createMemoryHistory'
// reducers
import AppReducer from '../components/Main/App.reducer'
import HomeReducer from '../components/components/Home/Home.reducer'
import AddReducer from '../components/components/Add/Add.reducer'
import FilterReducer from '../components/components/Filter/Filter.reducer'
import ListReducer from '../components/components/List/main/List.reducer'
import EditReducer from '../components/components/Edit/Main/Edit.reducer'
import SnackbarReducer from '../components/components/Snackbar/Snackbar.reducer'
// epics
import AppEpic from '../components/Main/App.effect'
import HomeEpic from '../components/components/Home/Home.effect'
import HomeSubscribeEpic from '../components/components/Home/Home.subscribe'
import AddEpic from '../components/components/Add/Add.effect'
import ListEpic from '../components/components/List/main/List.effect'
import FilterEpic from '../components/components/Filter/Filter.effect'
import EditEpic from '../components/components/Edit/Main/Edit.effect'
// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
/* eslint-enable */

// redux observable
const rootEpic = combineEpics(
  AppEpic,
  HomeEpic,
  HomeSubscribeEpic,
  AddEpic,
  ListEpic,
  FilterEpic,
  EditEpic,
)
const epicMiddleware = createEpicMiddleware(rootEpic)

const store = createStore(
  combineReducers({
    App: AppReducer,
    Home: HomeReducer,
    Add: AddReducer,
    Filter: FilterReducer,
    List: ListReducer,
    Edit: EditReducer,
    Snackbar: SnackbarReducer,
    router: routerReducer,
  }),
  composeEnhancers(applyMiddleware(middleware, epicMiddleware)),
)

export const { dispatch, getState } = store
export default store
